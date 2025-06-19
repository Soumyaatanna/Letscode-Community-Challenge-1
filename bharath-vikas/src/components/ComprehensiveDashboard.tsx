
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  RefreshCw, TrendingUp, TrendingDown, Activity, AlertCircle, 
  Globe, Heart, Leaf, Users, Building, Zap, Calendar, Clock,
  Share, Download, ExternalLink, ChevronDown, ChevronUp,
  Info, Star, Shield
} from 'lucide-react';
import { useAllEnhancedData, useManualEnhancedRefresh } from '@/hooks/useEnhancedRealTimeData';
import { formatDistanceToNow } from 'date-fns';

const ComprehensiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('economic');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const { economic, social, environmental, governance, equality, isLoading, isError, lastUpdated } = useAllEnhancedData();
  const { refreshAllData } = useManualEnhancedRefresh();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshAllData();
    setIsRefreshing(false);
  };

  const toggleCardExpansion = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  const getDataQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertLevelColor = (level?: string) => {
    switch (level) {
      case 'good': return 'border-l-green-500';
      case 'moderate': return 'border-l-yellow-500';
      case 'poor': return 'border-l-orange-500';
      case 'severe': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  const renderIndicatorCard = (indicator: any, category: string) => {
    const isExpanded = expandedCards.has(indicator.id);
    const cardClasses = `hover:shadow-lg transition-all duration-300 border-l-4 ${getAlertLevelColor(indicator.alertLevel)}`;

    return (
      <Card key={indicator.id} className={cardClasses}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2 mb-2">
                <span className="truncate">{indicator.name}</span>
                {indicator.reliability && (
                  <Badge variant="outline" className={`text-xs ${getDataQualityColor(indicator.reliability)}`}>
                    {indicator.reliability}
                  </Badge>
                )}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCardExpansion(indicator.id)}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Main Value */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {indicator.value} {indicator.unit}
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(indicator.trend)}
                  {indicator.ranking && (
                    <Badge variant="secondary" className="text-xs">
                      Rank: {indicator.ranking}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge variant="secondary" className="text-xs mb-1 block">
                  {indicator.source.split('(')[0]}
                </Badge>
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{indicator.period || 'Live'}</span>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="space-y-3 pt-3 border-t border-gray-100">
                {/* Gender Breakdown */}
                {indicator.genderBreakdown && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="text-sm font-medium">Male</div>
                      <div className="text-lg font-bold text-blue-600">
                        {indicator.genderBreakdown.male}{indicator.unit}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-pink-50 rounded">
                      <div className="text-sm font-medium">Female</div>
                      <div className="text-lg font-bold text-pink-600">
                        {indicator.genderBreakdown.female}{indicator.unit}
                      </div>
                    </div>
                  </div>
                )}

                {/* Rural/Urban Breakdown */}
                {indicator.ruralUrban && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="text-sm font-medium">Rural</div>
                      <div className="text-lg font-bold text-green-600">
                        {indicator.ruralUrban.rural}{indicator.unit}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="text-sm font-medium">Urban</div>
                      <div className="text-lg font-bold text-purple-600">
                        {indicator.ruralUrban.urban}{indicator.unit}
                      </div>
                    </div>
                  </div>
                )}

                {/* State-wise Data Preview */}
                {indicator.stateWise && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Top Performing States:</div>
                    <div className="space-y-1">
                      {Object.entries(indicator.stateWise)
                        .slice(0, 3)
                        .map(([state, value]) => (
                          <div key={state} className="flex justify-between text-sm">
                            <span>{state}</span>
                            <span className="font-medium">{value}{indicator.unit}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Global Comparison */}
                {indicator.globalAverage && (
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Global Average:</span>
                    <span className="font-medium">{indicator.globalAverage}{indicator.unit}</span>
                  </div>
                )}

                {/* Alert Level Info */}
                {indicator.alertLevel && (
                  <div className="flex items-center space-x-2 text-xs">
                    <Info className="h-3 w-3" />
                    <span>Status: {indicator.alertLevel}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const getTabContent = (tabValue: string) => {
    let data: any[] = [];
    
    switch (tabValue) {
      case 'economic':
        data = economic.data?.data || [];
        break;
      case 'social':
        data = social.data?.data || [];
        break;
      case 'environmental':
        data = environmental.data?.data || [];
        break;
      case 'governance':
        data = governance.data?.data || [];
        break;
      case 'equality':
        data = equality.data?.data || [];
        break;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(indicator => renderIndicatorCard(indicator, tabValue))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin text-orange-600" />
            <span>Loading comprehensive data...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-700 mb-4">
            <AlertCircle className="h-5 w-5" />
            <span>Error loading comprehensive data. Please try refreshing.</span>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Star className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            <span>Comprehensive India Dashboard</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Complete development indicators • Updated: {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="economic" className="flex flex-col items-center space-y-1 py-2">
            <Globe className="h-4 w-4" />
            <span className="text-xs">Economic</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex flex-col items-center space-y-1 py-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">Social</span>
          </TabsTrigger>
          <TabsTrigger value="environmental" className="flex flex-col items-center space-y-1 py-2">
            <Leaf className="h-4 w-4" />
            <span className="text-xs">Environment</span>
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex flex-col items-center space-y-1 py-2">
            <Building className="h-4 w-4" />
            <span className="text-xs">Governance</span>
          </TabsTrigger>
          <TabsTrigger value="equality" className="flex flex-col items-center space-y-1 py-2">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Equality</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="economic" className="mt-6">
          {getTabContent('economic')}
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          {getTabContent('social')}
        </TabsContent>

        <TabsContent value="environmental" className="mt-6">
          {getTabContent('environmental')}
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          {getTabContent('governance')}
        </TabsContent>

        <TabsContent value="equality" className="mt-6">
          {getTabContent('equality')}
        </TabsContent>
      </Tabs>

      {/* Data Sources */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ExternalLink className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-gray-900">Comprehensive Data Sources</span>
          </div>
          <p className="text-sm text-gray-700">
            Real-time data from 15+ official sources including RBI, MOSPI, CPCB, UNDP, World Bank, 
            Transparency International, and other Government of India APIs with intelligent fallback to verified mock data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveDashboard;
