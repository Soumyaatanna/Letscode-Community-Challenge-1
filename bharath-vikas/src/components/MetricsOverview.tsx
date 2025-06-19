
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricsOverviewProps {
  selectedCategory: string;
  categoryIcon: LucideIcon;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ selectedCategory, categoryIcon: CategoryIcon }) => {
  const getMetricsForCategory = (category: string) => {
    const metrics = {
      economic: [
        { name: 'GDP Growth', value: '7.2%', change: '+0.8%', trend: 'up' },
        { name: 'Employment Rate', value: '78.5%', change: '+2.3%', trend: 'up' },
        { name: 'FDI Inflow', value: '₹2.4T', change: '+15.2%', trend: 'up' },
        { name: 'Startup Density', value: '45/100k', change: '+12.8%', trend: 'up' }
      ],
      social: [
        { name: 'Literacy Rate', value: '85.2%', change: '+1.5%', trend: 'up' },
        { name: 'Gender Parity', value: '0.78', change: '+0.05', trend: 'up' },
        { name: 'Poverty Index', value: '12.3%', change: '-2.1%', trend: 'down' },
        { name: 'Social Security', value: '68.9%', change: '+5.2%', trend: 'up' }
      ],
      environmental: [
        { name: 'Air Quality', value: '142 AQI', change: '-18 AQI', trend: 'down' },
        { name: 'Green Cover', value: '23.4%', change: '+1.2%', trend: 'up' },
        { name: 'Water Quality', value: '76.8%', change: '+3.1%', trend: 'up' },
        { name: 'Renewable Energy', value: '42.5%', change: '+8.7%', trend: 'up' }
      ],
      infrastructure: [
        { name: 'Transport Index', value: '7.2/10', change: '+0.5', trend: 'up' },
        { name: 'Digital Infrastructure', value: '82.3%', change: '+6.8%', trend: 'up' },
        { name: 'Housing Availability', value: '89.1%', change: '+2.4%', trend: 'up' },
        { name: 'Power Reliability', value: '94.7%', change: '+1.9%', trend: 'up' }
      ],
      healthcare: [
        { name: 'Healthcare Index', value: '72.5/100', change: '+4.2', trend: 'up' },
        { name: 'Hospital Beds', value: '2.8/1000', change: '+0.3', trend: 'up' },
        { name: 'Doctor Ratio', value: '1.2/1000', change: '+0.1', trend: 'up' },
        { name: 'Vaccination Rate', value: '94.2%', change: '+2.8%', trend: 'up' }
      ],
      innovation: [
        { name: 'Digital Adoption', value: '68.3%', change: '+12.4%', trend: 'up' },
        { name: 'Patent Filings', value: '1.2k/M', change: '+18.5%', trend: 'up' },
        { name: 'R&D Spending', value: '0.68% GDP', change: '+0.08%', trend: 'up' },
        { name: 'Tech Exports', value: '₹8.9T', change: '+22.1%', trend: 'up' }
      ]
    };
    return metrics[category as keyof typeof metrics] || [];
  };

  const metrics = getMetricsForCategory(selectedCategory);

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <CategoryIcon className="h-6 w-6 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {selectedCategory} Metrics Overview
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-green-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : 'secondary'}
                  className={`${
                    metric.trend === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {metric.trend === 'up' ? 'Improving' : 'Improving'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MetricsOverview;
