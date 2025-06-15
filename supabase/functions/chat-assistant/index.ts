
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GOOGLE_AI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface ChatMessage {
  userId?: string;
  message: string;
  conversationId: string;
}

interface ProductResult {
  id: string;
  name: string;
  price: number;
  mrp: number | null;
  stock: number;
  image_urls: string[] | null;
  requires_prescription: boolean;
  category: string;
  description: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, message, conversationId }: ChatMessage = await req.json();

    console.log('Chat request:', { userId, message, conversationId });

    // Detect intent and search products if needed
    const intent = await detectIntent(message);
    console.log('Detected intent:', intent);

    let products: ProductResult[] = [];
    let orderInfo = null;

    // Handle product search
    if (intent === 'product_search' || intent === 'product_compare') {
      products = await searchProducts(message);
      console.log('Found products:', products.length);
    }

    // Handle order status
    if (intent === 'order_status' && userId) {
      orderInfo = await getOrderStatus(userId, message);
    }

    // Generate response using Gemini
    const response = await generateResponse(message, intent, products, orderInfo);

    // Store conversation context
    await storeConversationContext(conversationId, {
      userMessage: message,
      botResponse: response,
      intent,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({
      message: response,
      products,
      intent,
      conversationId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I encountered an error. Please try again.',
      message: 'I apologize, but I encountered an error. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function detectIntent(message: string): Promise<string> {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('order') && (lowerMessage.includes('status') || lowerMessage.includes('track'))) {
    return 'order_status';
  }
  
  if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('difference')) {
    return 'product_compare';
  }
  
  // Check for product-related keywords
  const productKeywords = ['medicine', 'tablet', 'capsule', 'syrup', 'cream', 'drops', 'vitamin', 'supplement', 'buy', 'need', 'looking for', 'search', 'price'];
  if (productKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'product_search';
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
    return 'greeting';
  }
  
  return 'general_info';
}

async function searchProducts(query: string): Promise<ProductResult[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, mrp, stock, image_urls, requires_prescription, category, description')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .limit(5);

    if (error) {
      console.error('Product search error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

async function getOrderStatus(userId: string, message: string) {
  try {
    // Extract order ID from message if present
    const orderIdMatch = message.match(/[a-f0-9-]{36}/i);
    
    let query = supabase
      .from('orders')
      .select('id, status, total_amount, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (orderIdMatch) {
      query = query.eq('id', orderIdMatch[0]);
    }

    const { data, error } = await query;

    if (error || !data?.length) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error('Error fetching order status:', error);
    return null;
  }
}

async function generateResponse(message: string, intent: string, products: ProductResult[], orderInfo: any): Promise<string> {
  const systemPrompt = `You are HealthCare Assistant, the AI representative for HealthCareWorld. 
Your duties: product search, comparisons, stock & price disclosure, order help, and safe health tips. 
Never provide medical diagnosis or treatment instructions—always advise consulting a healthcare professional. 
If a product requires a prescription, clearly state it and suggest speaking to a doctor.
Keep responses concise and helpful. Always be friendly and professional.`;

  let userPrompt = message;
  
  if (products.length > 0) {
    userPrompt += `\n\nAvailable products:\n${JSON.stringify(products, null, 2)}`;
  }
  
  if (orderInfo) {
    userPrompt += `\n\nOrder information:\n${JSON.stringify(orderInfo, null, 2)}`;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser: ${userPrompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 500,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_MEDICAL",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      let botResponse = data.candidates[0].content.parts[0].text;
      
      // Add medical disclaimer for health-related responses
      if (botResponse.toLowerCase().includes('health') || botResponse.toLowerCase().includes('medicine') || botResponse.toLowerCase().includes('symptom')) {
        botResponse += '\n\n⚕️ Information provided is for general purposes only. Consult a qualified healthcare professional for medical advice.';
      }
      
      return botResponse;
    }
    
    return getDefaultResponse(intent);
  } catch (error) {
    console.error('Gemini API error:', error);
    return getDefaultResponse(intent);
  }
}

function getDefaultResponse(intent: string): string {
  switch (intent) {
    case 'greeting':
      return "Hi 👋 I'm HealthCare Assistant. How can I help you today? I can help you find medicines, check stock, compare products, or answer health-related questions.";
    case 'product_search':
      return "I'd be happy to help you find the right medicine or health product. Could you please tell me more specifically what you're looking for?";
    case 'order_status':
      return "I can help you check your order status. Please provide your order ID or I can check your most recent order.";
    default:
      return "I'm here to help with your healthcare needs. You can ask me about medicines, check product availability, compare items, or get general health information.";
  }
}

async function storeConversationContext(conversationId: string, context: any) {
  try {
    await supabase
      .from('conversation_state')
      .upsert({
        conversation_id: conversationId,
        context: context,
        updated_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error storing conversation context:', error);
  }
}
