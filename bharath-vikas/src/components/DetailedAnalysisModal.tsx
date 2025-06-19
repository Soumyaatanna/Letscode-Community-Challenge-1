
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Eye, TrendingUp, BarChart3, Activity, Brain, Target, 
  ArrowUpRight, AlertCircle, CheckCircle, Clock 
} from 'lucide-react';
import { type MetricCategory } from '@/data/mockData';

interface DetailedAnalysisModalProps {
  selectedCategory: MetricCategory;
  children: React.ReactNode;
}

const DetailedAnalysisModal: React.FC<DetailedAnalysisModalProps> = ({ selectedCategory, children }) => {
  const getDetailedInsights = (category: MetricCategory) => {
    const insights = {
      economic: {
        title: "Economic Development Analysis",
        summary: "Comprehensive analysis of India's economic indicators shows strong growth momentum with areas for strategic improvement.",
        keyFindings: [
          "GDP growth rate of 7.2% positions India among fastest-growing major economies",
          "FDI inflow of $83.57B indicates strong investor confidence",
          "Unemployment rate at 6.1% requires targeted intervention programs",
          "Inflation at 4.8% remains within RBI's comfort zone"
        ],
        trendAnalysis: [
          { metric: "GDP Growth", trend: "Accelerating", confidence: 92, prediction: "Expected to reach 7.5% by Q4 2024" },
          { metric: "FDI Inflow", trend: "Stable", confidence: 88, prediction: "Projected $90B+ for FY 2024-25" },
          { metric: "Export Growth", trend: "Recovering", confidence: 75, prediction: "15% growth expected in next quarter" }
        ],
        riskFactors: [
          "Global economic slowdown impact on exports",
          "Rising input costs affecting manufacturing",
          "Geopolitical tensions affecting supply chains"
        ],
        opportunities: [
          "Digital economy expansion potential",
          "Green energy transition investments",
          "Services sector growth acceleration"
        ]
      },
      social: {
        title: "Social Development Analysis",
        summary: "India's social indicators show significant progress with persistent challenges in equality and access.",
        keyFindings: [
          "HDI value of 0.633 represents steady improvement over past decade",
          "Life expectancy increased to 70.19 years with gender gap narrowing",
          "Literacy rate at 77.7% shows urban-rural disparities",
          "Gender inequality index at 0.490 indicates room for improvement"
        ],
        trendAnalysis: [
          { metric: "Education Access", trend: "Improving", confidence: 85, prediction: "Digital education to boost rural access" },
          { metric: "Healthcare Coverage", trend: "Expanding", confidence: 78, prediction: "Universal coverage by 2030 feasible" },
          { metric: "Gender Parity", trend: "Gradual Progress", confidence: 72, prediction: "Workforce participation to increase" }
        ],
        riskFactors: [
          "Rural-urban development gap",
          "Skills mismatch in workforce",
          "Healthcare infrastructure strain"
        ],
        opportunities: [
          "Digital literacy programs expansion",
          "Telemedicine network growth",
          "Women workforce participation initiatives"
        ]
      },
      environmental: {
        title: "Environmental Sustainability Analysis",
        summary: "Environmental indicators highlight urgent need for accelerated green transition and pollution control measures.",
        keyFindings: [
          "CO2 emissions at 1.91 tons per capita below global average",
          "Renewable energy share reached 42.5% ahead of targets",
          "Air quality remains critical in major urban centers",
          "Forest cover at 21.71% requires protection and expansion"
        ],
        trendAnalysis: [
          { metric: "Renewable Energy", trend: "Rapid Growth", confidence: 94, prediction: "50% target achievable by 2026" },
          { metric: "Air Quality", trend: "Mixed", confidence: 65, prediction: "Improvement depends on policy enforcement" },
          { metric: "Carbon Intensity", trend: "Declining", confidence: 82, prediction: "33-35% reduction by 2030 on track" }
        ],
        riskFactors: [
          "Climate change impact on agriculture",
          "Water scarcity in multiple regions",
          "Industrial pollution challenges"
        ],
        opportunities: [
          "Green hydrogen economy development",
          "Electric vehicle adoption acceleration",
          "Sustainable agriculture practices"
        ]
      },
      infrastructure: {
        title: "Infrastructure Development Analysis",
        summary: "Infrastructure metrics show significant investment and modernization with focus on digital and transportation networks.",
        keyFindings: [
          "Infrastructure Quality Index at 4.18/7 shows improvement trajectory",
          "Internet penetration at 52.4% with rapid rural expansion",
          "Mobile subscriptions at 84.8 per 100 people indicating digital readiness",
          "Transportation networks expanding with metro and highway projects"
        ],
        trendAnalysis: [
          { metric: "Digital Infrastructure", trend: "Accelerating", confidence: 91, prediction: "75% internet penetration by 2025" },
          { metric: "Transportation", trend: "Modernizing", confidence: 86, prediction: "Smart mobility solutions scaling up" },
          { metric: "Power Grid", trend: "Strengthening", confidence: 88, prediction: "24x7 power for all by 2024" }
        ],
        riskFactors: [
          "Maintenance of aging infrastructure",
          "Digital divide between regions",
          "Funding gaps for rural projects"
        ],
        opportunities: [
          "Smart city initiatives expansion",
          "5G network deployment",
          "Renewable energy grid integration"
        ]
      },
      healthcare: {
        title: "Healthcare System Analysis",
        summary: "Healthcare indicators demonstrate progress in access and outcomes with continued need for capacity building.",
        keyFindings: [
          "Infant mortality rate reduced to 28 per 1000 births",
          "Life expectancy improvement with reduced gender gap",
          "Telemedicine adoption accelerated 150% in tier-3 cities",
          "Healthcare infrastructure investment showing positive outcomes"
        ],
        trendAnalysis: [
          { metric: "Digital Health", trend: "Exponential Growth", confidence: 89, prediction: "Telemedicine to reach 500M+ users" },
          { metric: "Primary Care", trend: "Strengthening", confidence: 81, prediction: "Community health centers expansion" },
          { metric: "Medical Tourism", trend: "Recovering", confidence: 76, prediction: "Pre-pandemic levels by 2025" }
        ],
        riskFactors: [
          "Healthcare worker shortage",
          "Rural healthcare access gaps",
          "Non-communicable disease burden"
        ],
        opportunities: [
          "AI-powered diagnostic tools",
          "Preventive healthcare programs",
          "Medical device manufacturing hub"
        ]
      },
      innovation: {
        title: "Innovation Ecosystem Analysis",
        summary: "Innovation metrics highlight India's emergence as a global technology and research hub with strong startup ecosystem.",
        keyFindings: [
          "R&D spending correlation with 45% higher patent filing rates",
          "Digital adoption in tier-2 cities growing 200% faster",
          "University density driving startup ecosystem strength",
          "Bangalore and Hyderabad maintaining tech leadership"
        ],
        trendAnalysis: [
          { metric: "Startup Ecosystem", trend: "Thriving", confidence: 93, prediction: "100+ unicorns by 2025" },
          { metric: "Patent Filings", trend: "Accelerating", confidence: 87, prediction: "Global top 5 by innovation output" },
          { metric: "Tech Talent", trend: "Expanding", confidence: 90, prediction: "World's largest tech workforce" }
        ],
        riskFactors: [
          "Brain drain to global markets",
          "Funding winter impact on startups",
          "Regulatory compliance challenges"
        ],
        opportunities: [
          "Deep tech innovation focus",
          "Government startup incentives",
          "Global R&D center expansion"
        ]
      }
    };
    return insights[category];
  };

  const analysis = getDetailedInsights(selectedCategory);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>{analysis.title}</span>
            <Badge variant="outline" className="ml-auto">AI Analysis</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Executive Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </CardContent>
          </Card>

          {/* Key Findings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Key Findings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm">{finding}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trend Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span>Trend Analysis & Predictions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.trendAnalysis.map((trend, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{trend.metric}</h4>
                      <Badge variant={trend.trend === 'Accelerating' || trend.trend === 'Rapid Growth' ? 'default' : 
                                   trend.trend === 'Improving' || trend.trend === 'Expanding' ? 'secondary' : 'outline'}>
                        {trend.trend}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-3 w-3 text-gray-500" />
                        <span className="text-sm text-gray-600">Confidence: {trend.confidence}%</span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${trend.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{trend.prediction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors & Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Risk Factors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                      <ArrowUpRight className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-red-800">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span>Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded-lg">
                      <ArrowUpRight className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-green-800">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Metadata */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Activity className="h-3 w-3" />
                  <span>Analysis generated using 37 cities, 15+ data sources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedAnalysisModal;
