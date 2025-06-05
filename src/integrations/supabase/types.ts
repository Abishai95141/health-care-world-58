export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      product_import_logs: {
        Row: {
          error_message: string | null
          failed_rows: number | null
          id: string
          imported_at: string
          staff_id: string
          status: string
          successful_rows: number | null
          total_rows: number | null
        }
        Insert: {
          error_message?: string | null
          failed_rows?: number | null
          id?: string
          imported_at?: string
          staff_id: string
          status?: string
          successful_rows?: number | null
          total_rows?: number | null
        }
        Update: {
          error_message?: string | null
          failed_rows?: number | null
          id?: string
          imported_at?: string
          staff_id?: string
          status?: string
          successful_rows?: number | null
          total_rows?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_import_logs_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff_users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string
          created_at: string
          description: string
          expiration_date: string | null
          id: string
          image_urls: string[] | null
          is_active: boolean
          manufacturer: string | null
          mrp: number | null
          name: string
          price: number
          requires_prescription: boolean
          slug: string
          stock: number
          tags: string[] | null
          unit: string
          updated_at: string
          weight_volume: string | null
        }
        Insert: {
          brand?: string | null
          category: string
          created_at?: string
          description: string
          expiration_date?: string | null
          id?: string
          image_urls?: string[] | null
          is_active?: boolean
          manufacturer?: string | null
          mrp?: number | null
          name: string
          price: number
          requires_prescription?: boolean
          slug: string
          stock?: number
          tags?: string[] | null
          unit: string
          updated_at?: string
          weight_volume?: string | null
        }
        Update: {
          brand?: string | null
          category?: string
          created_at?: string
          description?: string
          expiration_date?: string | null
          id?: string
          image_urls?: string[] | null
          is_active?: boolean
          manufacturer?: string | null
          mrp?: number | null
          name?: string
          price?: number
          requires_prescription?: boolean
          slug?: string
          stock?: number
          tags?: string[] | null
          unit?: string
          updated_at?: string
          weight_volume?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      staff_users: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_staff: {
        Args: { email_input: string; password_input: string }
        Returns: {
          user_id: string
          email: string
          role: string
        }[]
      }
      create_staff_user: {
        Args: {
          email_input: string
          password_input: string
          role_input?: string
        }
        Returns: string
      }
      generate_slug: {
        Args: { name: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
