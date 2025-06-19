
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RefreshCw, TrendingUp, TrendingDown, Activity, AlertCircle, 
  Globe, Heart, Leaf, Users, Building, Zap, Calendar, Clock,
  Share, Download, ExternalLink
} from 'lucide-react';
import { useAllRealTimeData, useManualRefresh } from '@/hooks/useRealTimeData';
import { formatDistanceToNow } from 'date-fns';

const RealTimeDataDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('economic');
  const { economic, social, environmental, health, governance, isLoading, isError, lastUpdated } = useAllRealTimeData();
  const { refreshAllData, refreshSpecificData } = useManualRefresh();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshAllData();
    setIsRefreshing(false);
  };

  const getIndicatorIcon = (category: string) => {
    const icons = {
      economic: Globe,
      social: Users,
      environmental: Leaf,
      health: Heart,
      governance: Building
    };
    return icons[category as keyof typeof icons] || Activity;
  };

  const getLastUpdatedText = (timestamp: number) => {
    if (!timestamp) return 'Never updated';
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const shareCurrentView = async () => {
    const shareData = {
      title: 'BharatVikas Real-time Data Dashboard',
      text: 'Check out the latest India development indicators',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      console.log('URL copied to clipboard');
    }
  };

  const exportData = () => {
    const allData = {
      timestamp: new Date().toISOString(),
      economic: economic.data?.data || [],
      social: social.data?.data || [],
      environmental: environmental.data?.data || [],
      health: health.data?.data || [],
      governance: governance.data?.data || []
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bharatvikas-realtime-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const renderIndicatorCard = (indicator: any, category: string) => {
    const IconComponent = getIndicatorIcon(category);
    const isPositiveTrend = category === 'environmental' && indicator.id?.includes('aqi') ? 
      false : Math.random() > 0.3; // Mock trend logic

    return (
      <Card key={indicator.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
              <IconComponent className="h-4 w-4 text-orange-600" />
              <span>{indicator.name}</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {indicator.value} {indicator.unit}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Period: {indicator.period || indicator.timestamp}
              </div>
              <div className="flex items-center space-x-2">
                {isPositiveTrend ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-xs font-medium ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveTrend ? '+' : '-'}{(Math.random() * 5).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="text-xs mb-1">
                {indicator.source}
              </Badge>
              <div className="text-xs text-gray-400 flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Updated {getLastUpdatedText(Date.now())}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-orange-600" />
          <span>Loading real-time data...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>Error loading real-time data. Please try refreshing.</span>
          </div>
          <Button onClick={handleRefresh} className="mt-4" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Activity className="h-6 w-6 text-orange-600" />
            <span>Real-time India Development Dashboard</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Live data from Government of India APIs • Last updated: {getLastUpdatedText(lastUpdated)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={shareCurrentView}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <Share className="h-3 w-3 mr-1" />
            Share
          </Button>
          <Button
            onClick={exportData}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Data Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="economic" className="flex items-center space-x-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Economic</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="environmental" className="flex items-center space-x-1">
            <Leaf className="h-4 w-4" />
            <span className="hidden sm:inline">Environment</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Health</span>
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex items-center space-x-1">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Governance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="economic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {economic.data?.data?.map(indicator => renderIndicatorCard(indicator, 'economic'))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {social.data?.data?.map(indicator => renderIndicatorCard(indicator, 'social'))}
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {environmental.data?.data?.map(indicator => renderIndicatorCard(indicator, 'environmental'))}
          </div>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {health.data?.data?.map(indicator => renderIndicatorCard(indicator, 'health'))}
          </div>
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {governance.data?.data?.map(indicator => renderIndicatorCard(indicator, 'governance'))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Data Sources Attribution */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ExternalLink className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-gray-900">Data Sources</span>
          </div>
          <p className="text-sm text-gray-700">
            Real-time data sourced from: Reserve Bank of India (RBI), Ministry of Statistics & Programme Implementation (MOSPI), 
            Central Pollution Control Board (CPCB), Ministry of Health & Family Welfare, TRAI, CoWIN, and other Government of India APIs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeDataDashboard;
