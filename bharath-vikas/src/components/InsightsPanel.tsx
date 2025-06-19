
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, TrendingUp, Award, AlertCircle, ArrowUpRight, 
  ArrowDownRight, Activity, Target, Zap, Eye 
} from 'lucide-react';
import { getInsights, type MetricCategory } from '@/data/mockData';
import DetailedAnalysisModal from './DetailedAnalysisModal';
import ImplementationPlanModal from './ImplementationPlanModal';

interface InsightsPanelProps {
  selectedCategory: MetricCategory;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ selectedCategory }) => {
  const insights = getInsights(selectedCategory);

  const getRandomInsight = (category: MetricCategory) => {
    const categoryInsights = {
      economic: [
        "AI Analysis: Tier-1 cities show 23% faster growth in digital infrastructure compared to tier-2 cities.",
        "Trend Alert: Southern cities demonstrate 15% higher startup density than national average.",
        "Correlation Found: Cities with higher FDI inflow show 28% better employment rates.",
        "Prediction: Based on current trends, Gujarat cities are likely to lead in industrial growth by 2026."
      ],
      social: [
        "Pattern Recognition: Cities with higher literacy rates show 34% better gender parity indices.",
        "AI Analysis: Kerala cities consistently outperform in social development metrics across all years.",
        "Trend Alert: Northern cities show accelerating improvement in education access since 2022.",
        "Correlation Found: Urban planning quality correlates with 31% better social security coverage."
      ],
      environmental: [
        "Anomaly Detected: Unusual spike in renewable energy adoption in Gujarat cities this quarter.",
        "AI Analysis: Cities with better air quality show 22% higher quality of life indices.",
        "Trend Alert: Coastal cities demonstrate superior waste management systems compared to inland cities.",
        "Prediction: Based on current green initiatives, tier-2 cities may achieve better AQI by 2025."
      ],
      infrastructure: [
        "AI Analysis: Smart city initiatives showing 40% higher ROI in cities with existing IT infrastructure.",
        "Pattern Recognition: Metro connectivity correlates with 35% improvement in economic indicators.",
        "Trend Alert: Digital infrastructure investment yields highest returns in tier-2 cities.",
        "Correlation Found: Transportation index improvements directly impact GDP growth by 18%."
      ],
      healthcare: [
        "Prediction: Based on current trends, southern cities are likely to lead in healthcare innovation by 2026.",
        "AI Analysis: Cities with higher doctor-to-patient ratios show 29% better health outcomes.",
        "Trend Alert: Telemedicine adoption accelerated 150% post-pandemic in tier-3 cities.",
        "Pattern Recognition: Healthcare infrastructure investment correlates with 26% improvement in life expectancy."
      ],
      innovation: [
        "AI Analysis: R&D spending correlates with 45% higher patent filing rates in tech hubs.",
        "Trend Alert: Digital adoption rates in tier-2 cities growing 200% faster than tier-1 cities.",
        "Prediction: Based on innovation metrics, Bangalore and Hyderabad will maintain tech leadership through 2026.",
        "Correlation Found: University density directly impacts startup ecosystem strength by 38%."
      ]
    };
    
    const insights = categoryInsights[category];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const getPolicyRecommendation = (category: MetricCategory) => {
    const recommendations = {
      economic: {
        title: "Economic Growth Strategy",
        action: "Focus on startup incubation and skill development programs in tier-2 cities to boost economic growth.",
        priority: "High",
        timeline: "18-24 months",
        sdg: "Goal 8: Decent Work"
      },
      social: {
        title: "Social Development Initiative",
        action: "Implement targeted literacy programs and women empowerment initiatives in underperforming regions.",
        priority: "Critical",
        timeline: "12-18 months",
        sdg: "Goal 4: Quality Education"
      },
      environmental: {
        title: "Environmental Sustainability",
        action: "Accelerate renewable energy adoption and introduce stricter emission norms for industrial zones.",
        priority: "Urgent",
        timeline: "6-12 months",
        sdg: "Goal 13: Climate Action"
      },
      infrastructure: {
        title: "Infrastructure Modernization",
        action: "Prioritize digital infrastructure development and smart transportation systems.",
        priority: "High",
        timeline: "24-36 months",
        sdg: "Goal 9: Infrastructure"
      },
      healthcare: {
        title: "Healthcare Enhancement",
        action: "Expand telemedicine networks and increase healthcare facility density in tier-2/3 cities.",
        priority: "Critical",
        timeline: "18-30 months",
        sdg: "Goal 3: Good Health"
      },
      innovation: {
        title: "Innovation Ecosystem",
        action: "Create innovation districts and R&D tax incentives to boost technology adoption.",
        priority: "Medium",
        timeline: "24-48 months",
        sdg: "Goal 9: Innovation"
      }
    };
    return recommendations[category];
  };

  const getInsightIcon = (index: number) => {
    const icons = [TrendingUp, ArrowUpRight, Target, Activity];
    return icons[index % icons.length];
  };

  const recommendation = getPolicyRecommendation(selectedCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Dynamic Top Performers */}
      <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-orange-600" />
            <span>Top Performers</span>
            <Badge variant="secondary" className="ml-auto text-xs">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = getInsightIcon(index);
            return (
              <div key={index} className="group cursor-pointer">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg hover:from-orange-100 hover:to-green-100 transition-all duration-300">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-orange-600" />
                      <span>{insight.title}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{insight.value}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <ArrowUpRight className="h-3 w-3 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Enhanced AI Insights */}
      <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-orange-600" />
            <span>AI Insights</span>
            <Badge variant="outline" className="ml-auto text-xs flex items-center space-x-1">
              <Zap className="h-3 w-3" />
              <span>Real-time</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-blue-800 font-medium mb-2 flex items-center space-x-2">
                    <span>Category Analysis</span>
                    <Activity className="h-3 w-3" />
                  </p>
                  <p className="text-sm text-blue-700 leading-relaxed">{getRandomInsight(selectedCategory)}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-lg font-bold text-green-800">94.2%</div>
                <div className="text-xs text-green-700">Accuracy</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-lg font-bold text-purple-800">37</div>
                <div className="text-xs text-purple-700">Cities</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-lg font-bold text-orange-800">6</div>
                <div className="text-xs text-orange-700">Metrics</div>
              </div>
            </div>

            <DetailedAnalysisModal selectedCategory={selectedCategory}>
              <Button variant="outline" size="sm" className="w-full text-xs hover:bg-blue-50">
                <Eye className="h-3 w-3 mr-1" />
                View Detailed Analysis
              </Button>
            </DetailedAnalysisModal>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Policy Recommendations */}
      <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span>Policy Insights</span>
            <Badge 
              variant="outline" 
              className={`ml-auto text-xs ${
                recommendation.priority === 'Critical' ? 'border-red-300 text-red-700' :
                recommendation.priority === 'Urgent' ? 'border-orange-300 text-orange-700' :
                recommendation.priority === 'High' ? 'border-yellow-300 text-yellow-700' :
                'border-gray-300 text-gray-700'
              }`}
            >
              {recommendation.priority}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <span>{recommendation.title}</span>
                <ArrowUpRight className="h-4 w-4 text-orange-600" />
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{recommendation.action}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span className="px-2 py-1 bg-orange-100 rounded-full">{recommendation.timeline}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center text-xs py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                SDG Alignment: {recommendation.sdg}
              </Badge>
              <Badge variant="outline" className="w-full justify-center text-xs py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                Implementation: {recommendation.timeline}
              </Badge>
              <Badge variant="outline" className="w-full justify-center text-xs py-2 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                Expected Impact: {recommendation.priority === 'Critical' ? 'Very High' : recommendation.priority}
              </Badge>
            </div>

            <ImplementationPlanModal selectedCategory={selectedCategory}>
              <Button variant="outline" size="sm" className="w-full text-xs hover:bg-orange-50">
                <Target className="h-3 w-3 mr-1" />
                View Implementation Plan
              </Button>
            </ImplementationPlanModal>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
