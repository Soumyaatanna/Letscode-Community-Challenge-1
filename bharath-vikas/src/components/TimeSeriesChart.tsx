
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import { TrendingUp, Download, ZoomIn, BarChart3, TrendingDown } from 'lucide-react';
import type { TimeSeriesData } from '@/data/mockData';
 import type { TooltipProps } from 'recharts';
interface TimeSeriesChartProps {
  selectedCities: string[];
  selectedMetric: string;
  data: TimeSeriesData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  selectedCities,
  selectedMetric,
  data
}) => {
  const [showBrush, setShowBrush] = useState(false);
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);

  const colors = [
    '#FF9933', '#138808', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'
  ];

  const formatMetricName = (metric: string) => {
    return metric.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTooltipValue = (value: number, metric: string) => {
    if (metric === 'population') return `${value.toFixed(1)}M`;
    if (metric === 'gdp_growth' || metric === 'literacy_rate' || metric === 'digital_adoption') {
      return `${value.toFixed(1)}%`;
    }
    if (metric === 'air_quality') return `${Math.round(value)} AQI`;
    if (metric === 'healthcare_index') return `${value.toFixed(1)}/100`;
    return value.toFixed(1);
  };

  const getMetricUnit = (metric: string) => {
    if (metric === 'population') return 'millions';
    if (metric === 'gdp_growth' || metric === 'literacy_rate' || metric === 'digital_adoption') return '%';
    if (metric === 'air_quality') return 'AQI';
    if (metric === 'healthcare_index') return '/100';
    return '';
  };

  const calculateTrend = (cityName: string) => {
    const cityData = data.map(d => d[cityName] as number).filter(Boolean);
    if (cityData.length < 2) return 0;
    const firstValue = cityData[0];
    const lastValue = cityData[cityData.length - 1];
    return ((lastValue - firstValue) / firstValue) * 100;
  };

 

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl max-w-xs">
          <p className="font-semibold text-gray-900 mb-3 text-center border-b pb-2">{`Year: ${label}`}</p>
          <div className="space-y-2">
            {payload
              .sort((a: { value: number; dataKey: string; color: string }, b: { value: number; dataKey: string; color: string }) => b.value - a.value)
              .map((entry: { value: number; dataKey: string; color: string }, index: number) => {
                const trend = calculateTrend(entry.dataKey);
                return (
                  <div key={index} className="flex items-center justify-between space-x-3 p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {entry.dataKey}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">
                        {formatTooltipValue(entry.value, selectedMetric)}
                      </span>
                      {Math.abs(trend) > 1 && (
                        <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span className="text-xs font-medium">{Math.abs(trend).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-3 pt-2 border-t text-xs text-gray-500 text-center">
            Click city name below to highlight
          </div>
        </div>
      );
    }
    return null;
  };

  const exportChartData = () => {
    const csvContent = [
      ['Year', ...selectedCities].join(','),
      ...data.map(row => [
        row.year,
        ...selectedCities.map(city => row[city] || '')
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedMetric}-timeseries-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <Card className="col-span-1 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span>{formatMetricName(selectedMetric)} Trends</span>
            <Badge variant="secondary" className="text-xs">
              {getMetricUnit(selectedMetric)}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBrush(!showBrush)}
              className="text-xs"
            >
              <ZoomIn className="h-3 w-3 mr-1" />
              {showBrush ? 'Hide' : 'Show'} Zoom
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportChartData}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => formatTooltipValue(value, selectedMetric)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {selectedCities.map((city, index) => (
                <Line
                  key={city}
                  type="monotone"
                  dataKey={city}
                  stroke={colors[index % colors.length]}
                  strokeWidth={highlightedCity === city ? 4 : highlightedCity && highlightedCity !== city ? 1 : 2}
                  opacity={highlightedCity && highlightedCity !== city ? 0.3 : 1}
                  dot={{ 
                    fill: colors[index % colors.length], 
                    strokeWidth: 2, 
                    r: highlightedCity === city ? 6 : 4 
                  }}
                  activeDot={{ 
                    r: 8, 
                    stroke: colors[index % colors.length], 
                    strokeWidth: 2,
                    fill: '#fff'
                  }}
                />
              ))}
              {showBrush && (
                <Brush 
                  dataKey="year" 
                  height={30} 
                  stroke="#FF9933"
                  fill="#FFF3E0"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* City Legend with Trends */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {selectedCities.map((city, index) => {
              const trend = calculateTrend(city);
              const isHighlighted = highlightedCity === city;
              
              return (
                <button
                  key={city}
                  onClick={() => setHighlightedCity(highlightedCity === city ? null : city)}
                  className={`
                    flex items-center justify-between p-2 rounded-lg border transition-all duration-200
                    ${isHighlighted 
                      ? 'border-orange-500 bg-orange-50 shadow-md' 
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {city}
                    </span>
                  </div>
                  {Math.abs(trend) > 1 && (
                    <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span className="text-xs font-medium">{Math.abs(trend).toFixed(1)}%</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <span className="font-medium">Tracking {formatMetricName(selectedMetric).toLowerCase()}</span>
            </div>
            <p>
              Monitoring {selectedCities.length} cities from 2019-2024. 
              Click city names above to highlight trends. Use zoom controls for detailed analysis.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;
