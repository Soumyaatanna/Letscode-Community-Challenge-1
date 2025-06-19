
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Medal } from 'lucide-react';
import type { TimeSeriesData } from '@/data/mockData';

interface CityRankingsProps {
  metric: string;
  data: TimeSeriesData[];
}

const CityRankings: React.FC<CityRankingsProps> = ({ metric, data }) => {
  const latestData = data[data.length - 1];
  
  const rankings = Object.entries(latestData)
    .filter(([key]) => key !== 'year')
    .map(([city, value]) => ({ city, value: value as number }))
    .sort((a, b) => {
      // For air quality, lower is better
      if (metric === 'air_quality') {
        return a.value - b.value;
      }
      // For other metrics, higher is better
      return b.value - a.value;
    })
    .slice(0, 10);

  const formatValue = (value: number, metric: string) => {
    if (metric === 'population') return `${value.toFixed(1)}M`;
    if (metric === 'gdp_growth' || metric === 'literacy_rate' || metric === 'digital_adoption') {
      return `${value.toFixed(1)}%`;
    }
    if (metric === 'air_quality') return `${Math.round(value)} AQI`;
    if (metric === 'healthcare_index') return `${value.toFixed(1)}/100`;
    return value.toFixed(1);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
  };

  const getBadgeVariant = (rank: number) => {
    if (rank <= 3) return 'default';
    if (rank <= 6) return 'secondary';
    return 'outline';
  };

  const formatMetricName = (metric: string) => {
    return metric.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-orange-600" />
          <span>City Rankings - {formatMetricName(metric)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rankings.map((item, index) => (
            <div
              key={item.city}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50 ${
                index < 3 ? 'bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getRankIcon(index + 1)}
                <div>
                  <div className="font-medium text-gray-900">{item.city}</div>
                  <div className="text-sm text-gray-600">
                    {formatValue(item.value, metric)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getBadgeVariant(index + 1)}>
                  #{index + 1}
                </Badge>
                {index < 3 && (
                  <div className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                    Top Performer
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Rankings based on latest 2024 data. 
            {metric === 'air_quality' && ' Lower AQI values indicate better air quality.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityRankings;
