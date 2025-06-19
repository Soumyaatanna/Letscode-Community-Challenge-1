
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, PieChartIcon, Award, Printer } from 'lucide-react';
import type { TimeSeriesData } from '@/data/mockData';
// Define LegendPayload type locally since it's not exported by recharts
type LegendPayload = {
  value: string;
  color: string;
};
 import type { LegendProps } from 'recharts';
import type { TooltipProps } from 'recharts';
interface PieChartDashboardProps {
  selectedCities: string[];
  selectedMetric: string;
  data: TimeSeriesData[];
}

const PieChartDashboard: React.FC<PieChartDashboardProps> = ({
  selectedCities,
  selectedMetric,
  data
}) => {
  const colors = ['#FF9933', '#138808', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  const formatMetricName = (metric: string) => {
    return metric.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatValue = (value: number, metric: string) => {
    if (metric === 'population') return `${value.toFixed(1)}M`;
    if (metric === 'gdp_growth' || metric === 'literacy_rate' || metric === 'digital_adoption') {
      return `${value.toFixed(1)}%`;
    }
    if (metric === 'air_quality') return `${Math.round(value)}`;
    if (metric === 'healthcare_index') return `${value.toFixed(1)}`;
    return value.toFixed(1);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('pie-charts-container');
    if (printContent) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>BharatVikas Dashboard - ${formatMetricName(selectedMetric)} Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .charts-container { display: flex; flex-direction: column; gap: 20px; }
                .chart-section { page-break-inside: avoid; }
                @media print { 
                  .no-print { display: none; }
                  body { margin: 0; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>BharatVikas Dashboard Report</h1>
                <h2>${formatMetricName(selectedMetric)} Analysis</h2>
                <p>Cities: ${selectedCities.join(', ')}</p>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
              </div>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
      }
    }
  };

  // Get latest data for pie chart
  const latestData = data[data.length - 1];
  const pieData = selectedCities.map((city, index) => ({
    name: city,
    value: latestData[city] as number || 0,
    color: colors[index % colors.length]
  })).filter(item => item.value > 0);

  // Calculate growth trends
  const growthData = selectedCities.map((city, index) => {
    const cityValues = data.map(d => d[city] as number).filter(Boolean);
    if (cityValues.length < 2) return { name: city, growth: 0, color: colors[index % colors.length] };
    
    const firstValue = cityValues[0];
    const lastValue = cityValues[cityValues.length - 1];
    const growth = ((lastValue - firstValue) / firstValue) * 100;
    
    return {
      name: city,
      growth: Math.abs(growth),
      color: colors[index % colors.length]
    };
  }).filter(item => item.growth > 0);



  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {formatValue(data.value as number, selectedMetric)}
          </p>
        </div>
      );
    }
    return null;
  };

 

  

  const CustomLegend = ({ payload }: LegendProps) => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload && payload.map((entry: LegendPayload, index: number) => (
        <div key={index} className="flex items-center space-x-1 text-xs">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700 dark:text-gray-300">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6" id="pie-charts-container">
      <div className="flex justify-end mb-4">
        <Button
          onClick={handlePrint}
          variant="outline"
          size="sm"
          className="no-print"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </div>

      {/* Current Values Pie Chart */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-orange-600" />
            <span>Current Distribution</span>
            <Badge variant="secondary" className="text-xs">
              2024
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <PieChartIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Select cities to view distribution</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Growth Trends Pie Chart */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Growth Trends</span>
            <Badge variant="secondary" className="text-xs">
              5-year
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {growthData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={growthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="growth"
                  >
                    {growthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0];
                        const value = typeof data.value === 'number' ? data.value : 0;
                        return (
                          <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{data.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Growth: {value.toFixed(1)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Select cities to view growth trends</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Performer Card */}
      {pieData.length > 0 && (
        <Card className="bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Top Performer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {pieData.reduce((max, city) => city.value > max.value ? city : max).name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatValue(Math.max(...pieData.map(d => d.value)), selectedMetric)} in {formatMetricName(selectedMetric)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PieChartDashboard;
