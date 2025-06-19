
export type MetricCategory = 'economic' | 'social' | 'environmental' | 'infrastructure' | 'healthcare' | 'innovation';

export interface City {
  id: string;
  name: string;
  state: string;
  population: number;
  coordinates: [number, number];
  tier: 1 | 2 | 3;
}

export interface MetricData {
  city: string;
  value: number;
  year: number;
  rank?: number;
}

export interface TimeSeriesData {
  year: number;
  [cityName: string]: number;
}

// Major Indian cities data - Extended to 35+ cities
export const getCitiesData = (): City[] => [
  // Tier 1 Cities
  { id: '1', name: 'Mumbai', state: 'Maharashtra', population: 20.4, coordinates: [72.8777, 19.0760], tier: 1 },
  { id: '2', name: 'Delhi', state: 'Delhi', population: 32.9, coordinates: [77.1025, 28.7041], tier: 1 },
  { id: '3', name: 'Bangalore', state: 'Karnataka', population: 13.6, coordinates: [77.5946, 12.9716], tier: 1 },
  { id: '4', name: 'Hyderabad', state: 'Telangana', population: 10.5, coordinates: [78.4867, 17.3850], tier: 1 },
  { id: '5', name: 'Chennai', state: 'Tamil Nadu', population: 11.0, coordinates: [80.2707, 13.0827], tier: 1 },
  { id: '6', name: 'Kolkata', state: 'West Bengal', population: 14.9, coordinates: [88.3639, 22.5726], tier: 1 },
  { id: '7', name: 'Pune', state: 'Maharashtra', population: 7.4, coordinates: [73.8567, 18.5204], tier: 1 },
  { id: '8', name: 'Ahmedabad', state: 'Gujarat', population: 8.4, coordinates: [72.5714, 23.0225], tier: 1 },
  
  // Tier 2 Cities
  { id: '9', name: 'Jaipur', state: 'Rajasthan', population: 3.9, coordinates: [75.7873, 26.9124], tier: 2 },
  { id: '10', name: 'Lucknow', state: 'Uttar Pradesh', population: 3.6, coordinates: [80.9462, 26.8467], tier: 2 },
  { id: '11', name: 'Kochi', state: 'Kerala', population: 2.1, coordinates: [76.2673, 9.9312], tier: 2 },
  { id: '12', name: 'Indore', state: 'Madhya Pradesh', population: 3.3, coordinates: [75.8577, 22.7196], tier: 2 },
  { id: '13', name: 'Bhopal', state: 'Madhya Pradesh', population: 2.4, coordinates: [77.4126, 23.2599], tier: 2 },
  { id: '14', name: 'Chandigarh', state: 'Punjab', population: 1.2, coordinates: [76.7794, 30.7333], tier: 2 },
  { id: '15', name: 'Coimbatore', state: 'Tamil Nadu', population: 2.2, coordinates: [76.9558, 11.0168], tier: 2 },
  { id: '16', name: 'Visakhapatnam', state: 'Andhra Pradesh', population: 2.3, coordinates: [83.2185, 17.6868], tier: 2 },
  { id: '17', name: 'Surat', state: 'Gujarat', population: 6.6, coordinates: [72.8311, 21.1702], tier: 2 },
  { id: '18', name: 'Kanpur', state: 'Uttar Pradesh', population: 3.0, coordinates: [80.3319, 26.4499], tier: 2 },
  { id: '19', name: 'Nagpur', state: 'Maharashtra', population: 2.6, coordinates: [79.0882, 21.1458], tier: 2 },
  { id: '20', name: 'Thiruvananthapuram', state: 'Kerala', population: 1.7, coordinates: [76.9366, 8.5241], tier: 2 },
  { id: '21', name: 'Vadodara', state: 'Gujarat', population: 2.1, coordinates: [73.2080, 22.3072], tier: 2 },
  { id: '22', name: 'Nashik', state: 'Maharashtra', population: 2.0, coordinates: [73.7898, 19.9975], tier: 2 },
  { id: '23', name: 'Faridabad', state: 'Haryana', population: 1.9, coordinates: [77.3178, 28.4089], tier: 2 },
  { id: '24', name: 'Rajkot', state: 'Gujarat', population: 1.8, coordinates: [70.8022, 22.3039], tier: 2 },
  { id: '25', name: 'Ghaziabad', state: 'Uttar Pradesh', population: 2.4, coordinates: [77.4538, 28.6692], tier: 2 },
  
  // Tier 3 Cities
  { id: '26', name: 'Mysore', state: 'Karnataka', population: 1.0, coordinates: [76.6394, 12.2958], tier: 3 },
  { id: '27', name: 'Aurangabad', state: 'Maharashtra', population: 1.3, coordinates: [75.3433, 19.8762], tier: 3 },
  { id: '28', name: 'Raipur', state: 'Chhattisgarh', population: 1.1, coordinates: [81.6296, 21.2514], tier: 3 },
  { id: '29', name: 'Bhubaneswar', state: 'Odisha', population: 1.0, coordinates: [85.8245, 20.2961], tier: 3 },
  { id: '30', name: 'Dehradun', state: 'Uttarakhand', population: 0.8, coordinates: [78.0322, 30.3165], tier: 3 },
  { id: '31', name: 'Guwahati', state: 'Assam', population: 1.0, coordinates: [91.7362, 26.1445], tier: 3 },
  { id: '32', name: 'Jammu', state: 'Jammu & Kashmir', population: 0.6, coordinates: [74.8570, 32.7266], tier: 3 },
  { id: '33', name: 'Mangalore', state: 'Karnataka', population: 0.7, coordinates: [74.8560, 12.9141], tier: 3 },
  { id: '34', name: 'Madurai', state: 'Tamil Nadu', population: 1.6, coordinates: [78.1198, 9.9252], tier: 3 },
  { id: '35', name: 'Varanasi', state: 'Uttar Pradesh', population: 1.4, coordinates: [82.9739, 25.3176], tier: 3 },
  { id: '36', name: 'Amritsar', state: 'Punjab', population: 1.2, coordinates: [74.8723, 31.6340], tier: 3 },
  { id: '37', name: 'Jodhpur', state: 'Rajasthan', population: 1.1, coordinates: [73.0243, 26.2389], tier: 3 },
];

// Generate comprehensive metrics data
export const getMetricsData = () => {
  const cities = getCitiesData();
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  
  // GDP Growth Rate (%)
  const gdp_growth: TimeSeriesData[] = years.map(year => {
    const yearData: TimeSeriesData = { year };
    cities.forEach(city => {
      const baseGrowth = city.tier === 1 ? 7.5 : city.tier === 2 ? 6.8 : 6.2;
      const variance = (Math.random() - 0.5) * 3;
      const covidImpact = year === 2020 ? -4 : year === 2021 ? -1 : 0;
      yearData[city.name] = Math.max(0, baseGrowth + variance + covidImpact);
    });
    return yearData;
  });

  // Population (millions)
  const population: TimeSeriesData[] = years.map(year => {
    const yearData: TimeSeriesData = { year };
    cities.forEach(city => {
      const growthRate = 0.02; // 2% annual growth
      const yearsFromBase = year - 2019;
      yearData[city.name] = city.population * Math.pow(1 + growthRate, yearsFromBase);
    });
    return yearData;
  });

  // Literacy Rate (%)
  const literacy_rate: TimeSeriesData[] = years.map(year => {
    const yearData: TimeSeriesData = { year };
    cities.forEach(city => {
      const baseLiteracy = city.tier === 1 ? 88 : city.tier === 2 ? 82 : 78;
      const improvement = (year - 2019) * 0.8; // 0.8% improvement per year
      const variance = (Math.random() - 0.5) * 4;
      yearData[city.name] = Math.min(100, baseLiteracy + improvement + variance);
    });
    return yearData;
  });

  // Air Quality Index (lower is better)
  const air_quality: TimeSeriesData[] = years.map(year => {
    const yearData: TimeSeriesData = { year };
    cities.forEach(city => {
      const baseAQI = city.tier === 1 ? 180 : city.tier === 2 ? 140 : 120;
      const improvement = (year - 2019) * -5; // Improving by 5 points per year
      const seasonal = Math.sin((year - 2019) * Math.PI) * 20; // Seasonal variation
      const variance = (Math.random() - 0.5) * 30;
      yearData[city.name] = Math.max(50, baseAQI + improvement + seasonal + variance);
    });
    return yearData;
  });

  // Healthcare Index (0-100, higher is better)
  const healthcare_index: TimeSeriesData[] = years.map(year => {
    const yearData: TimeSeriesData = { year };
    cities.forEach(city => {
      const baseIndex = city.tier === 1 ? 72 : city.tier === 2 ? 65 : 58;
      const improvement = (year - 2019) * 1.5; // 1.5 points improvement per year
      const covidImpact = year === 2020 ? -5 : year === 2021 ? -2 : 0;
      const variance = (Math.random() - 0.5) * 8;
      yearData[city.name] = Math.min(100, Math.max(0, baseIndex + improvement + covidImpact + variance));
    });
    return yearData;
  });

  // Digital Adoption (%)
  const digital_adoption: TimeSeriesData[] = years.map(year => {
    const yearData: TimeSeriesData = { year };
    cities.forEach(city => {
      const baseAdoption = city.tier === 1 ? 45 : city.tier === 2 ? 35 : 25;
      const acceleration = (year - 2019) * 8; // Rapid digital growth
      const covidBoost = year >= 2020 ? 10 : 0; // COVID accelerated digital adoption
      const variance = (Math.random() - 0.5) * 6;
      yearData[city.name] = Math.min(100, baseAdoption + acceleration + covidBoost + variance);
    });
    return yearData;
  });

  return {
    gdp_growth,
    population,
    literacy_rate,
    air_quality,
    healthcare_index,
    digital_adoption
  };
};

// Metrics categorization
export const getMetricsByCategory = (): Record<MetricCategory, string[]> => ({
  economic: ['gdp_growth', 'employment_rate', 'fdi_inflow', 'startup_density'],
  social: ['literacy_rate', 'gender_parity', 'poverty_index', 'social_security'],
  environmental: ['air_quality', 'green_cover', 'water_quality', 'renewable_energy'],
  infrastructure: ['transport_index', 'digital_infrastructure', 'housing_availability', 'power_reliability'],
  healthcare: ['healthcare_index', 'hospital_beds', 'doctor_ratio', 'vaccination_rate'],
  innovation: ['digital_adoption', 'patent_filings', 'research_spending', 'tech_exports']
});

// Generate insights data
export const getInsights = (category: MetricCategory) => {
  const insights = {
    economic: [
      { title: "GDP Growth Leaders", value: "Bangalore, Hyderabad", trend: "up" },
      { title: "Investment Hotspots", value: "Mumbai, Pune", trend: "up" },
      { title: "Startup Ecosystems", value: "Bangalore, Delhi", trend: "up" }
    ],
    social: [
      { title: "Literacy Champions", value: "Chandigarh, Kochi", trend: "up" },
      { title: "Gender Parity Leaders", value: "Kerala Cities, Bangalore", trend: "up" },
      { title: "Social Progress", value: "Southern Cities", trend: "up" }
    ],
    environmental: [
      { title: "Air Quality Winners", value: "Chandigarh, Kochi", trend: "up" },
      { title: "Green Cover Leaders", value: "Bangalore, Pune", trend: "up" },
      { title: "Clean Energy Adoption", value: "Gujarat Cities", trend: "up" }
    ],
    infrastructure: [
      { title: "Smart City Index", value: "Pune, Surat", trend: "up" },
      { title: "Digital Infrastructure", value: "Bangalore, Hyderabad", trend: "up" },
      { title: "Transport Connectivity", value: "Delhi, Mumbai", trend: "up" }
    ],
    healthcare: [
      { title: "Healthcare Excellence", value: "Chennai, Bangalore", trend: "up" },
      { title: "Medical Tourism Hubs", value: "Chennai, Mumbai", trend: "up" },
      { title: "Health Innovation", value: "Bangalore, Hyderabad", trend: "up" }
    ],
    innovation: [
      { title: "Tech Innovation Hubs", value: "Bangalore, Hyderabad", trend: "up" },
      { title: "Digital Transformation", value: "Mumbai, Pune", trend: "up" },
      { title: "R&D Investment", value: "Bangalore, Chennai", trend: "up" }
    ]
  };

  return insights[category];
};
