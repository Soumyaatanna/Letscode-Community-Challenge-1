
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, Clock, Users, DollarSign, CheckCircle, AlertTriangle,
  Calendar, FileText, BarChart3, Settings, MapPin, Zap
} from 'lucide-react';
import { type MetricCategory } from '@/data/mockData';

interface ImplementationPlanModalProps {
  selectedCategory: MetricCategory;
  children: React.ReactNode;
}

const ImplementationPlanModal: React.FC<ImplementationPlanModalProps> = ({ selectedCategory, children }) => {
  const getImplementationPlan = (category: MetricCategory) => {
    const plans = {
      economic: {
        title: "Economic Growth Strategy Implementation",
        objective: "Boost economic growth through startup incubation and skill development programs in tier-2 cities",
        timeline: "18-24 months",
        budget: "₹15,000 Cr",
        priority: "High",
        phases: [
          {
            name: "Phase 1: Foundation Setup",
            duration: "6 months",
            activities: [
              "Establish startup incubation centers in 20 tier-2 cities",
              "Create skill development curriculum with industry partners",
              "Set up funding mechanisms and investor networks",
              "Launch digital platform for startup registration and tracking"
            ],
            milestones: ["20 incubation centers operational", "1000+ startups registered", "50+ mentors onboarded"],
            budget: "₹5,000 Cr"
          },
          {
            name: "Phase 2: Scale & Operations",
            duration: "12 months",
            activities: [
              "Scale operations to 50 additional cities",
              "Launch advanced skill development programs",
              "Implement AI-powered startup matching system",
              "Create innovation challenges and competitions"
            ],
            milestones: ["100,000 skilled professionals trained", "500 startups funded", "10 unicorns identified"],
            budget: "₹8,000 Cr"
          },
          {
            name: "Phase 3: Optimization",
            duration: "6 months",
            activities: [
              "Performance evaluation and optimization",
              "International partnerships and market access",
              "Sustainability planning and exit strategies",
              "Knowledge transfer and best practices documentation"
            ],
            milestones: ["50% self-sustaining centers", "International partnerships", "Best practices documented"],
            budget: "₹2,000 Cr"
          }
        ],
        stakeholders: [
          { name: "Ministry of MSME", role: "Policy & Funding", involvement: "Primary" },
          { name: "State Governments", role: "Implementation & Land", involvement: "Critical" },
          { name: "Private Sector", role: "Mentorship & Investment", involvement: "Partnership" },
          { name: "Educational Institutions", role: "Skill Development", involvement: "Support" }
        ],
        kpis: [
          { metric: "Startups Incubated", target: "5,000+", timeframe: "24 months" },
          { metric: "Jobs Created", target: "200,000+", timeframe: "24 months" },
          { metric: "Investment Attracted", target: "₹50,000 Cr", timeframe: "24 months" },
          { metric: "GDP Contribution", target: "0.5%", timeframe: "36 months" }
        ],
        risks: [
          { risk: "Funding delays", mitigation: "Staggered release mechanisms", impact: "Medium" },
          { risk: "Skill mismatch", mitigation: "Industry-aligned curriculum", impact: "High" },
          { risk: "Regulatory hurdles", mitigation: "Policy advocacy and reform", impact: "Medium" }
        ]
      },
      social: {
        title: "Social Development Initiative Implementation",
        objective: "Implement targeted literacy programs and women empowerment initiatives in underperforming regions",
        timeline: "12-18 months",
        budget: "₹8,500 Cr",
        priority: "Critical",
        phases: [
          {
            name: "Phase 1: Assessment & Setup",
            duration: "3 months",
            activities: [
              "Comprehensive baseline assessment in target regions",
              "Establish community learning centers",
              "Train local facilitators and volunteers",
              "Develop culturally appropriate learning materials"
            ],
            milestones: ["500 learning centers established", "2000 facilitators trained", "Materials localized"],
            budget: "₹1,500 Cr"
          },
          {
            name: "Phase 2: Program Launch",
            duration: "12 months",
            activities: [
              "Launch literacy programs for adults and children",
              "Implement women's skill development initiatives",
              "Create livelihood generation programs",
              "Establish digital literacy components"
            ],
            milestones: ["500,000 enrolled in literacy programs", "100,000 women skilled", "50,000 livelihoods created"],
            budget: "₹5,500 Cr"
          },
          {
            name: "Phase 3: Sustainability",
            duration: "3 months",
            activities: [
              "Performance evaluation and impact assessment",
              "Community ownership transition",
              "Success story documentation and replication",
              "Long-term sustainability planning"
            ],
            milestones: ["90% program retention", "Community ownership", "Replication framework"],
            budget: "₹1,500 Cr"
          }
        ],
        stakeholders: [
          { name: "Ministry of Education", role: "Policy & Oversight", involvement: "Primary" },
          { name: "Ministry of Women & Child Development", role: "Women's Programs", involvement: "Critical" },
          { name: "Local NGOs", role: "Implementation", involvement: "Partnership" },
          { name: "Community Leaders", role: "Mobilization", involvement: "Support" }
        ],
        kpis: [
          { metric: "Literacy Rate Improvement", target: "15%", timeframe: "18 months" },
          { metric: "Women Workforce Participation", target: "25%", timeframe: "24 months" },
          { metric: "Digital Literacy", target: "60%", timeframe: "18 months" },
          { metric: "Income Increase", target: "40%", timeframe: "24 months" }
        ],
        risks: [
          { risk: "Cultural resistance", mitigation: "Community engagement", impact: "High" },
          { risk: "Facilitator retention", mitigation: "Competitive compensation", impact: "Medium" },
          { risk: "Technology adoption", mitigation: "Gradual introduction", impact: "Low" }
        ]
      },
      environmental: {
        title: "Environmental Sustainability Implementation",
        objective: "Accelerate renewable energy adoption and introduce stricter emission norms for industrial zones",
        timeline: "6-12 months",
        budget: "₹25,000 Cr",
        priority: "Urgent",
        phases: [
          {
            name: "Phase 1: Policy & Infrastructure",
            duration: "3 months",
            activities: [
              "Draft and approve stricter emission norms",
              "Establish renewable energy targets and incentives",
              "Create green finance mechanisms",
              "Set up monitoring and compliance systems"
            ],
            milestones: ["New norms approved", "Green finance operational", "Monitoring systems deployed"],
            budget: "₹3,000 Cr"
          },
          {
            name: "Phase 2: Implementation",
            duration: "6 months",
            activities: [
              "Deploy renewable energy projects",
              "Implement industrial compliance programs",
              "Launch green technology adoption incentives",
              "Create carbon trading mechanisms"
            ],
            milestones: ["10 GW renewable capacity added", "80% industrial compliance", "Carbon market operational"],
            budget: "₹18,000 Cr"
          },
          {
            name: "Phase 3: Scaling",
            duration: "3 months",
            activities: [
              "Scale successful programs nationally",
              "International partnerships for technology transfer",
              "Performance evaluation and optimization",
              "Next phase planning and financing"
            ],
            milestones: ["National scaling", "International partnerships", "Performance targets met"],
            budget: "₹4,000 Cr"
          }
        ],
        stakeholders: [
          { name: "Ministry of Environment", role: "Policy & Regulation", involvement: "Primary" },
          { name: "Ministry of Power", role: "Renewable Energy", involvement: "Critical" },
          { name: "Industrial Associations", role: "Compliance", involvement: "Partnership" },
          { name: "Financial Institutions", role: "Green Financing", involvement: "Support" }
        ],
        kpis: [
          { metric: "Renewable Energy Share", target: "50%", timeframe: "12 months" },
          { metric: "Emission Reduction", target: "25%", timeframe: "12 months" },
          { metric: "Green Jobs Created", target: "500,000", timeframe: "18 months" },
          { metric: "Investment Mobilized", target: "₹1,00,000 Cr", timeframe: "12 months" }
        ],
        risks: [
          { risk: "Technology costs", mitigation: "Subsidies and incentives", impact: "High" },
          { risk: "Grid integration", mitigation: "Smart grid upgrades", impact: "Medium" },
          { risk: "Industry resistance", mitigation: "Phased implementation", impact: "Medium" }
        ]
      },
      infrastructure: {
        title: "Infrastructure Modernization Implementation",
        objective: "Prioritize digital infrastructure development and smart transportation systems",
        timeline: "24-36 months",
        budget: "₹50,000 Cr",
        priority: "High",
        phases: [
          {
            name: "Phase 1: Digital Foundation",
            duration: "12 months",
            activities: [
              "5G network deployment in major cities",
              "Fiber optic expansion to rural areas",
              "Data center establishment",
              "Digital governance platform development"
            ],
            milestones: ["50 cities 5G enabled", "100,000 km fiber laid", "20 data centers operational"],
            budget: "₹20,000 Cr"
          },
          {
            name: "Phase 2: Smart Transportation",
            duration: "18 months",
            activities: [
              "Smart traffic management systems",
              "Electric vehicle charging infrastructure",
              "Integrated public transport systems",
              "Autonomous vehicle pilot programs"
            ],
            milestones: ["100 smart cities", "50,000 EV charging points", "Autonomous pilots launched"],
            budget: "₹25,000 Cr"
          },
          {
            name: "Phase 3: Integration & Optimization",
            duration: "6 months",
            activities: [
              "System integration and interoperability",
              "Performance optimization and scaling",
              "International best practice adoption",
              "Next generation planning"
            ],
            milestones: ["Full system integration", "International recognition", "Next phase roadmap"],
            budget: "₹5,000 Cr"
          }
        ],
        stakeholders: [
          { name: "Ministry of Communications", role: "Digital Infrastructure", involvement: "Primary" },
          { name: "Ministry of Road Transport", role: "Transportation", involvement: "Critical" },
          { name: "Private Telecom Companies", role: "Network Deployment", involvement: "Partnership" },
          { name: "Technology Companies", role: "Innovation", involvement: "Support" }
        ],
        kpis: [
          { metric: "Internet Penetration", target: "90%", timeframe: "36 months" },
          { metric: "Smart Cities", target: "200", timeframe: "36 months" },
          { metric: "Digital Transactions", target: "80%", timeframe: "24 months" },
          { metric: "Transport Efficiency", target: "40% improvement", timeframe: "36 months" }
        ],
        risks: [
          { risk: "Technology obsolescence", mitigation: "Flexible architecture", impact: "Medium" },
          { risk: "Cybersecurity threats", mitigation: "Robust security frameworks", impact: "High" },
          { risk: "Coordination challenges", mitigation: "Centralized PMO", impact: "Medium" }
        ]
      },
      healthcare: {
        title: "Healthcare Enhancement Implementation",
        objective: "Expand telemedicine networks and increase healthcare facility density in tier-2/3 cities",
        timeline: "18-30 months",
        budget: "₹18,000 Cr",
        priority: "Critical",
        phases: [
          {
            name: "Phase 1: Infrastructure Development",
            duration: "9 months",
            activities: [
              "Establish telemedicine hubs in tier-2/3 cities",
              "Upgrade existing healthcare facilities",
              "Deploy digital health platforms",
              "Train healthcare workers on new technologies"
            ],
            milestones: ["200 telemedicine hubs", "500 facilities upgraded", "5000 workers trained"],
            budget: "₹8,000 Cr"
          },
          {
            name: "Phase 2: Service Expansion",
            duration: "15 months",
            activities: [
              "Scale telemedicine services nationally",
              "Implement AI-powered diagnostic tools",
              "Launch preventive healthcare programs",
              "Create integrated health records system"
            ],
            milestones: ["10M telemedicine consultations", "AI diagnostics deployed", "Health records integrated"],
            budget: "₹8,000 Cr"
          },
          {
            name: "Phase 3: Quality & Sustainability",
            duration: "6 months",
            activities: [
              "Quality assurance and standardization",
              "Financial sustainability planning",
              "International collaboration and recognition",
              "Continuous improvement mechanisms"
            ],
            milestones: ["Quality standards met", "Sustainability achieved", "International recognition"],
            budget: "₹2,000 Cr"
          }
        ],
        stakeholders: [
          { name: "Ministry of Health", role: "Policy & Oversight", involvement: "Primary" },
          { name: "State Health Departments", role: "Implementation", involvement: "Critical" },
          { name: "Private Healthcare", role: "Service Delivery", involvement: "Partnership" },
          { name: "Technology Partners", role: "Platform Development", involvement: "Support" }
        ],
        kpis: [
          { metric: "Healthcare Access", target: "95%", timeframe: "30 months" },
          { metric: "Telemedicine Adoption", target: "70%", timeframe: "24 months" },
          { metric: "Preventive Care Coverage", target: "80%", timeframe: "30 months" },
          { metric: "Health Outcome Improvement", target: "25%", timeframe: "36 months" }
        ],
        risks: [
          { risk: "Technology adoption barriers", mitigation: "Training and support", impact: "Medium" },
          { risk: "Regulatory compliance", mitigation: "Clear guidelines", impact: "High" },
          { risk: "Data security concerns", mitigation: "Robust security measures", impact: "High" }
        ]
      },
      innovation: {
        title: "Innovation Ecosystem Implementation",
        objective: "Create innovation districts and R&D tax incentives to boost technology adoption",
        timeline: "24-48 months",
        budget: "₹12,000 Cr",
        priority: "Medium",
        phases: [
          {
            name: "Phase 1: Foundation & Policy",
            duration: "12 months",
            activities: [
              "Establish innovation districts in major cities",
              "Create R&D tax incentive framework",
              "Set up technology transfer offices",
              "Launch startup accelerator programs"
            ],
            milestones: ["10 innovation districts", "Tax incentives operational", "100 startups accelerated"],
            budget: "₹4,000 Cr"
          },
          {
            name: "Phase 2: Ecosystem Development",
            duration: "24 months",
            activities: [
              "Scale innovation districts nationally",
              "Implement university-industry partnerships",
              "Create international collaboration programs",
              "Launch deep tech innovation challenges"
            ],
            milestones: ["50 innovation districts", "200 uni-industry partnerships", "International collaborations"],
            budget: "₹6,000 Cr"
          },
          {
            name: "Phase 3: Global Leadership",
            duration: "12 months",
            activities: [
              "Establish India as global innovation hub",
              "Create intellectual property framework",
              "Launch innovation diplomacy initiatives",
              "Achieve technology leadership in key sectors"
            ],
            milestones: ["Global innovation ranking top 10", "IP framework operational", "Technology leadership"],
            budget: "₹2,000 Cr"
          }
        ],
        stakeholders: [
          { name: "Ministry of Science & Technology", role: "Policy & Funding", involvement: "Primary" },
          { name: "Universities & Research Institutes", role: "R&D", involvement: "Critical" },
          { name: "Technology Companies", role: "Innovation", involvement: "Partnership" },
          { name: "International Organizations", role: "Collaboration", involvement: "Support" }
        ],
        kpis: [
          { metric: "Innovation Index Ranking", target: "Top 10", timeframe: "48 months" },
          { metric: "Patent Applications", target: "2x increase", timeframe: "36 months" },
          { metric: "R&D Investment", target: "3% of GDP", timeframe: "48 months" },
          { metric: "Technology Startups", target: "10,000+", timeframe: "36 months" }
        ],
        risks: [
          { risk: "Talent drain", mitigation: "Competitive ecosystem", impact: "High" },
          { risk: "Funding gaps", mitigation: "Multiple funding sources", impact: "Medium" },
          { risk: "Regulatory delays", mitigation: "Fast-track approvals", impact: "Medium" }
        ]
      }
    };
    return plans[category];
  };

  const plan = getImplementationPlan(selectedCategory);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span>{plan.title}</span>
            <Badge variant={plan.priority === 'Critical' ? 'destructive' : 
                          plan.priority === 'Urgent' ? 'default' : 
                          plan.priority === 'High' ? 'secondary' : 'outline'}>
              {plan.priority} Priority
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="phases">Phases</TabsTrigger>
            <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{plan.objective}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Timeline</p>
                      <p className="text-blue-800">{plan.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-green-600 font-medium">Budget</p>
                      <p className="text-green-800">{plan.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Priority</p>
                      <p className="text-orange-800">{plan.priority}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phases" className="space-y-4">
            {plan.phases.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span>{phase.name}</span>
                    <Badge variant="outline" className="ml-auto">{phase.duration}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Key Activities</span>
                      </h4>
                      <ul className="space-y-1">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span>Milestones</span>
                      </h4>
                      <ul className="space-y-1">
                        {phase.milestones.map((milestone, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget Allocation: {phase.budget}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stakeholders" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.stakeholders.map((stakeholder, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{stakeholder.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{stakeholder.role}</p>
                        <Badge variant={stakeholder.involvement === 'Primary' ? 'default' :
                                     stakeholder.involvement === 'Critical' ? 'destructive' :
                                     stakeholder.involvement === 'Partnership' ? 'secondary' : 'outline'}>
                          {stakeholder.involvement}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kpis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="h-5 w-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{kpi.metric}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-600">Target</p>
                            <p className="text-lg font-bold text-green-600">{kpi.target}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Timeframe</p>
                            <p className="text-sm text-gray-800">{kpi.timeframe}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            {plan.risks.map((risk, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`h-5 w-5 mt-1 ${
                      risk.impact === 'High' ? 'text-red-600' :
                      risk.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{risk.risk}</h4>
                        <Badge variant={risk.impact === 'High' ? 'destructive' :
                                     risk.impact === 'Medium' ? 'default' : 'secondary'}>
                          {risk.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Mitigation:</span> {risk.mitigation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImplementationPlanModal;
