import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';
import type { TimeSeriesData } from '@/data/mockData';
import type { TooltipProps } from 'recharts';

interface CityComparisonProps {
  selectedCities: string[];
  selectedMetric: string;
  data: TimeSeriesData[];
}

const CityComparison: React.FC<CityComparisonProps> = ({
  selectedCities,
  selectedMetric,
  data
}) => {
  const latestData = data[data.length - 1];
  
  const comparisonData = selectedCities.map(city => ({
    city: city.length > 8 ? city.substring(0, 8) + '...' : city,
    fullName: city,
    value: latestData[city] as number || 0
  })).sort((a, b) => {
    // For air quality, lower is better (ascending)
    if (selectedMetric === 'air_quality') {
      return a.value - b.value;
    }
    // For other metrics, higher is better (descending)
    return b.value - a.value;
  });

  const colors = [
    '#FF9933', // Saffron
    '#138808', // Green
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Light Green
  ];

  const formatValue = (value: number, metric: string) => {
    if (metric === 'population') return `${value.toFixed(1)}M`;
    if (metric === 'gdp_growth' || metric === 'literacy_rate' || metric === 'digital_adoption') {
      return `${value.toFixed(1)}%`;
    }
    if (metric === 'air_quality') return `${Math.round(value)} AQI`;
    if (metric === 'healthcare_index') return `${value.toFixed(1)}/100`;
    return value.toFixed(1);
  };

  const formatMetricName = (metric: string) => {
    return metric.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

 

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{data.fullName}</p>
          <p className="text-sm text-gray-700">
            {formatMetricName(selectedMetric)}: {formatValue(payload[0].value as number, selectedMetric)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-orange-600" />
          <span>City Comparison - {formatMetricName(selectedMetric)} (2024)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="city" 
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => formatValue(value, selectedMetric)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
            <div className="text-2xl font-bold text-yellow-800">
              {comparisonData.length > 0 ? comparisonData[0].fullName : 'N/A'}
            </div>
            <div className="text-sm text-yellow-700">Best Performer</div>
            <div className="text-lg font-semibold text-yellow-800 mt-1">
              {comparisonData.length > 0 ? formatValue(comparisonData[0].value, selectedMetric) : 'N/A'}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">
              {comparisonData.length > 0 ? 
                formatValue(comparisonData.reduce((sum, city) => sum + city.value, 0) / comparisonData.length, selectedMetric) : 'N/A'}
            </div>
            <div className="text-sm text-blue-700">Average</div>
            <div className="text-lg font-semibold text-blue-800 mt-1">
              {selectedCities.length} Cities
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-800">
              {comparisonData.length > 0 ? 
                Math.max(...comparisonData.map(c => c.value)) - Math.min(...comparisonData.map(c => c.value)) : 0}
            </div>
            <div className="text-sm text-green-700">Range</div>
            <div className="text-lg font-semibold text-green-800 mt-1">
              Variation
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityComparison;
