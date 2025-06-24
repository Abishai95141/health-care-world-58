
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { X, Upload, Eye } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  placement: string;
  headline: string;
  subtext?: string;
  cta_text?: string;
  cta_url?: string;
  image_url?: string;
  display_order: number;
  is_enabled: boolean;
}

interface BannerEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner?: Banner | null;
  onSave: () => void;
}

const BannerEditorModal: React.FC<BannerEditorModalProps> = ({
  isOpen,
  onClose,
  banner,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    placement: '',
    headline: '',
    subtext: '',
    cta_text: '',
    cta_url: '',
    image_url: '',
    display_order: 1,
    is_enabled: true,
  });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title,
        placement: banner.placement,
        headline: banner.headline,
        subtext: banner.subtext || '',
        cta_text: banner.cta_text || '',
        cta_url: banner.cta_url || '',
        image_url: banner.image_url || '',
        display_order: banner.display_order,
        is_enabled: banner.is_enabled,
      });
    } else {
      setFormData({
        title: '',
        placement: '',
        headline: '',
        subtext: '',
        cta_text: '',
        cta_url: '',
        image_url: '',
        display_order: 1,
        is_enabled: true,
      });
    }
  }, [banner]);

  const handleSave = async () => {
    if (!formData.title || !formData.placement || !formData.headline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (banner) {
        const { error } = await supabase
          .from('ad_banners')
          .update(formData)
          .eq('id', banner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('ad_banners')
          .insert([formData]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Banner ${banner ? 'updated' : 'created'} successfully`,
      });
      onSave();
    } catch (error: any) {
      console.error('Error saving banner:', error);
      toast({
        title: "Error",
        description: "Failed to save banner",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    const { placement, headline, subtext, cta_text, image_url } = formData;

    switch (placement) {
      case 'home_hero':
        return (
          <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">{headline}</h2>
                {subtext && <p className="text-gray-300 mb-4">{subtext}</p>}
                {cta_text && (
                  <Button className="bg-green-600 hover:bg-green-700 rounded-xl">
                    {cta_text}
                  </Button>
                )}
              </div>
              {image_url && (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img src={image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        );

      case 'shop_top':
        return (
          <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📢</span>
                <div>
                  <h3 className="font-semibold">{headline}</h3>
                  {subtext && <p className="text-sm text-gray-300">{subtext}</p>}
                </div>
              </div>
              {cta_text && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-xl">
                  {cta_text}
                </Button>
              )}
            </div>
          </div>
        );

      case 'cart_footer':
        return (
          <Card className="p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">{headline}</h3>
            {subtext && <p className="text-gray-600 mb-4">{subtext}</p>}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-xl text-center">
                  <div className="bg-gray-200 h-16 rounded-lg mb-2"></div>
                  <p className="text-sm">Product {i}</p>
                </div>
              ))}
            </div>
          </Card>
        );

      case 'checkout_confirmation':
        return (
          <Card className="p-6 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <span className="text-green-600">📧</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{headline}</h3>
                {subtext && <p className="text-gray-600 text-sm">{subtext}</p>}
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Enter email" className="rounded-xl" />
                <Button className="bg-green-600 hover:bg-green-700 rounded-xl">
                  {cta_text || 'Subscribe'}
                </Button>
              </div>
            </div>
          </Card>
        );

      default:
        return <div className="text-gray-500 text-center py-8">Select a placement to see preview</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">
            {banner ? 'Edit Banner' : 'Create New Banner'}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="rounded-xl"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-xl p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-6 p-6`}>
            {/* Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Banner title"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="placement">Placement *</Label>
                  <Select value={formData.placement} onValueChange={(value) => setFormData({ ...formData, placement: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home_hero">Home Hero</SelectItem>
                      <SelectItem value="shop_top">Shop Top</SelectItem>
                      <SelectItem value="cart_footer">Cart Footer</SelectItem>
                      <SelectItem value="checkout_confirmation">Checkout Confirmation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="headline">Headline *</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="Main headline text"
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="subtext">Subtext</Label>
                <Textarea
                  id="subtext"
                  value={formData.subtext}
                  onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                  placeholder="Additional description text"
                  className="rounded-xl"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta_text">CTA Text</Label>
                  <Input
                    id="cta_text"
                    value={formData.cta_text}
                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    placeholder="Button text"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="cta_url">CTA URL</Label>
                  <Input
                    id="cta_url"
                    value={formData.cta_url}
                    onChange={(e) => setFormData({ ...formData, cta_url: e.target.value })}
                    placeholder="https://example.com"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.is_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_enabled: checked })}
                  />
                  <Label>Enabled</Label>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <div className="border rounded-xl p-4 bg-gray-50">
                  {renderPreview()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#27AE60] hover:bg-[#229954] text-white rounded-xl"
          >
            {loading ? 'Saving...' : (banner ? 'Update Banner' : 'Create Banner')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerEditorModal;
