
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Share, Copy, Link, Facebook, Twitter, Linkedin, 
  Mail, Download, QrCode, Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareViewProps {
  title?: string;
  description?: string;
  data?: any;
  currentFilters?: {
    cities: string[];
    metric: string;
    category: string;
    year: number;
  };
}

const ShareView: React.FC<ShareViewProps> = ({ 
  title = "BharatVikas Dashboard", 
  description = "India Development Data Insights",
  data,
  currentFilters 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateShareableUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    if (currentFilters) {
      params.set('cities', currentFilters.cities.join(','));
      params.set('metric', currentFilters.metric);
      params.set('category', currentFilters.category);
      params.set('year', currentFilters.year.toString());
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  const shareableUrl = generateShareableUrl();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareViaAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareableUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyToClipboard(shareableUrl);
    }
  };

  const socialShareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareableUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + shareableUrl)}`
  };

  const exportShareableData = () => {
    const exportData = {
      title,
      description,
      url: shareableUrl,
      timestamp: new Date().toISOString(),
      filters: currentFilters,
      data: data
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bharatvikas-share-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Share className="h-4 w-4" />
        <span>Share View</span>
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 z-50 w-80 shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Share className="h-5 w-5 text-orange-600" />
              <span>Share This View</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Shareable URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Shareable URL
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  value={shareableUrl}
                  readOnly
                  className="text-xs"
                />
                <Button
                  onClick={() => copyToClipboard(shareableUrl)}
                  variant="outline"
                  size="sm"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Current Filters Summary */}
            {currentFilters && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current Selection
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {currentFilters.cities.map(city => (
                      <Badge key={city} variant="secondary" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600">
                    Metric: {currentFilters.metric} | Category: {currentFilters.category} | Year: {currentFilters.year}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Share Options */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Quick Share
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={shareViaAPI}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button
                  onClick={exportShareableData}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            {/* Social Media Sharing */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Share on Social Media
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => window.open(socialShareUrls.twitter, '_blank')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Button>
                <Button
                  onClick={() => window.open(socialShareUrls.facebook, '_blank')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button
                  onClick={() => window.open(socialShareUrls.linkedin, '_blank')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Button>
                <Button
                  onClick={() => window.open(socialShareUrls.email, '_blank')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Button>
              </div>
            </div>

            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShareView;
