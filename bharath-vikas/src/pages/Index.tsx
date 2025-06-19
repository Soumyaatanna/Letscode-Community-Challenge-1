import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Search, TrendingUp, Award, Leaf, Building, Users, Heart, Zap, Download, 
  ChevronDown, MapPin, BarChart3, Filter, Share, Calendar, Star
} from 'lucide-react';
import MetricsOverview from '@/components/MetricsOverview';
import CityComparison from '@/components/CityComparison';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import CityRankings from '@/components/CityRankings';
import InsightsPanel from '@/components/InsightsPanel';
import CitySelector from '@/components/CitySelector';
import PieChartDashboard from '@/components/PieChartDashboard';
import DarkModeToggle from '@/components/DarkModeToggle';
import PrintableReport from '@/components/PrintableReport';
import { getCitiesData, getMetricsData, type City, type MetricCategory } from '@/data/mockData';
import RealTimeDataDashboard from '@/components/RealTimeDataDashboard';
import ComprehensiveDashboard from '@/components/ComprehensiveDashboard';

const Index = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>(['Mumbai', 'Delhi', 'Bangalore']);
  const [selectedMetric, setSelectedMetric] = useState<string>('gdp_growth');
  const [selectedCategory, setSelectedCategory] = useState<MetricCategory>('economic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [activeView, setActiveView] = useState<'comprehensive' | 'legacy'>('comprehensive');

  const cities = getCitiesData();
  const metricsData = getMetricsData();

  const filteredCities = useMemo(() => {
    return cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const categoryIcons = {
    economic: { icon: TrendingUp, color: 'text-green-600' },
    social: { icon: Users, color: 'text-blue-600' },
    environmental: { icon: Leaf, color: 'text-emerald-600' },
    infrastructure: { icon: Building, color: 'text-gray-600' },
    healthcare: { icon: Heart, color: 'text-red-600' },
    innovation: { icon: Zap, color: 'text-yellow-600' }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({
      cities: selectedCities,
      metric: selectedMetric,
      category: selectedCategory,
      year: selectedYear,
      data: metricsData[selectedMetric as keyof typeof metricsData]
    }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bharatvikas-${selectedCategory}-${selectedMetric}-${selectedYear}.json`;
    link.click();
  };

  const handleShareView = () => {
    const params = new URLSearchParams({
      cities: selectedCities.join(','),
      metric: selectedMetric,
      category: selectedCategory,
      year: selectedYear.toString()
    });
    const shareUrl = `${window.location.origin}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Shareable URL copied to clipboard:', shareUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 via-white to-green-400 dark:from-orange-600 dark:via-gray-800 dark:to-green-600 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md transition-colors duration-300">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  BharatVikas Dashboard
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm lg:text-base">
                  Comprehensive India Development Analytics
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1">
                <Button
                  variant={activeView === 'comprehensive' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('comprehensive')}
                  className="text-xs"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Complete
                </Button>
                <Button
                  variant={activeView === 'legacy' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('legacy')}
                  className="text-xs"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Button>
              </div>
              <DarkModeToggle />
              <Button 
                onClick={handleExportData}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {activeView === 'comprehensive' ? (
          // New Comprehensive Dashboard
          <div className="space-y-6">
            <ComprehensiveDashboard />
          </div>
        ) : (
          // Legacy Dashboard with City Analytics
          <div className="space-y-6 sm:space-y-8">
            {/* Enhanced Search and Filters */}
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-orange-600" />
                    <span>Filters & Search</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <Collapsible open={filtersOpen}>
                <CollapsibleContent>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search cities or states..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      
                      <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as MetricCategory)}>
                        <SelectTrigger>
                          <div className="flex items-center space-x-2">
                            {React.createElement(categoryIcons[selectedCategory].icon, { 
                              className: `h-4 w-4 ${categoryIcons[selectedCategory].color}` 
                            })}
                            <SelectValue placeholder="Select category" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryIcons).map(([key, { icon: Icon, color }]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center space-x-2">
                                <Icon className={`h-4 w-4 ${color}`} />
                                <span className="capitalize">{key}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                        <SelectTrigger>
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4 text-gray-600" />
                            <SelectValue placeholder="Select metric" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gdp_growth">GDP Growth (%)</SelectItem>
                          <SelectItem value="population">Population (millions)</SelectItem>
                          <SelectItem value="literacy_rate">Literacy Rate (%)</SelectItem>
                          <SelectItem value="air_quality">Air Quality Index</SelectItem>
                          <SelectItem value="healthcare_index">Healthcare Index</SelectItem>
                          <SelectItem value="digital_adoption">Digital Adoption (%)</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                        <SelectTrigger>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-600" />
                            <SelectValue placeholder="Select year" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {[2019, 2020, 2021, 2022, 2023, 2024].map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Selected Cities: {selectedCities.length}/6</span>
                      </div>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <span>Total Cities: {filteredCities.length}</span>
                      </Badge>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* City Selection */}
            <CitySelector
              cities={filteredCities}
              selectedCities={selectedCities}
              onSelectionChange={setSelectedCities}
            />

            {/* Legacy Real-time Data Dashboard */}
            <div className="mb-8">
              <RealTimeDataDashboard />
            </div>

            {/* Printable Reports */}
            <PrintableReport
              selectedCities={selectedCities}
              selectedMetric={selectedMetric}
              selectedCategory={selectedCategory}
              data={metricsData[selectedMetric as keyof typeof metricsData]}
            />

            {/* Insights Panel */}
            <InsightsPanel selectedCategory={selectedCategory} />

            {/* Metrics Overview */}
            <MetricsOverview 
              selectedCategory={selectedCategory} 
              categoryIcon={categoryIcons[selectedCategory].icon}
            />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <div className="xl:col-span-2">
                <TimeSeriesChart 
                  selectedCities={selectedCities}
                  selectedMetric={selectedMetric}
                  data={metricsData[selectedMetric as keyof typeof metricsData]}
                />
              </div>
              <div className="xl:col-span-1">
                <PieChartDashboard 
                  selectedCities={selectedCities}
                  selectedMetric={selectedMetric}
                  data={metricsData[selectedMetric as keyof typeof metricsData]}
                />
              </div>
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              <CityRankings 
                metric={selectedMetric}
                data={metricsData[selectedMetric as keyof typeof metricsData]}
              />
              <CityComparison 
                selectedCities={selectedCities}
                selectedMetric={selectedMetric}
                data={metricsData[selectedMetric as keyof typeof metricsData]}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold mb-2">BharatVikas Dashboard</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive data-driven insights for India's development
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
                <div className="w-6 h-4 bg-white rounded-sm"></div>
                <div className="w-6 h-4 bg-green-500 rounded-sm"></div>
              </div>
              <span className="text-sm text-gray-400">Made with 🇮🇳 for India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
