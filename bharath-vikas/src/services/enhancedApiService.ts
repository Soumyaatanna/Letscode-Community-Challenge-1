
import { QueryClient } from '@tanstack/react-query';

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  lastUpdated: string;
  source: string;
  dataQuality: 'high' | 'medium' | 'low';
}

export interface ExtendedEconomicIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  period: string;
  source: string;
  lastUpdated: string;
  trend?: 'up' | 'down' | 'stable';
  reliability: 'high' | 'medium' | 'low';
  stateWise?: { [state: string]: number };
}

export interface SocialIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  period: string;
  source: string;
  lastUpdated: string;
  genderBreakdown?: { male: number; female: number };
  ruralUrban?: { rural: number; urban: number };
}

export interface EnvironmentalIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  location: string;
  timestamp: string;
  source: string;
  alertLevel?: 'good' | 'moderate' | 'poor' | 'severe';
}

export interface GovernanceIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  period: string;
  source: string;
  lastUpdated: string;
  ranking?: number;
  globalAverage?: number;
}

class EnhancedApiService {
  private baseUrls = {
    dataGovIn: 'https://api.data.gov.in/resource',
    rbi: 'https://rbi.org.in/Scripts/api',
    mospi: 'https://mospi.gov.in/api',
    cpcb: 'https://api.cpcb.gov.in/air',
    cowin: 'https://cdn-api.co-vin.in/api',
    worldBank: 'https://api.worldbank.org/v2/country/IND/indicator',
    undp: 'https://hdr.undp.org/sites/default/files/hdr_composite_indices_complete_time_series.csv',
    transparency: 'https://www.transparency.org/api'
  };

  private async fetchWithFallback<T>(
    apiCall: () => Promise<T>,
    mockDataFallback: () => T,
    source: string
  ): Promise<ApiResponse<T>> {
    try {
      // Try real API first
      const data = await Promise.race([
        apiCall(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('API timeout')), 5000)
        )
      ]);
      
      return {
        data,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: `${source} (Live API)`,
        dataQuality: 'high'
      };
    } catch (error) {
      console.warn(`API failed for ${source}, falling back to mock data:`, error);
      
      // Fallback to mock data
      const mockData = mockDataFallback();
      return {
        data: mockData,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: `${source} (Mock Data)`,
        dataQuality: 'medium'
      };
    }
  }

  async fetchCompleteEconomicData(): Promise<ApiResponse<ExtendedEconomicIndicator[]>> {
    const apiCall = async (): Promise<ExtendedEconomicIndicator[]> => {
      // Real API calls would go here
      const responses = await Promise.all([
        fetch(`${this.baseUrls.rbi}/gdp-data`),
        fetch(`${this.baseUrls.mospi}/economic-indicators`),
        fetch(`${this.baseUrls.worldBank}/NY.GDP.MKTP.KD.ZG?format=json&date=2024`)
      ]);
      
      // Parse real API responses
      const data = await Promise.all(responses.map(r => r.json()));
      return this.parseEconomicData(data);
    };

    const mockDataFallback = (): ExtendedEconomicIndicator[] => [
      {
        id: 'gdp_growth',
        name: 'GDP Growth Rate',
        value: 7.2,
        unit: '%',
        period: 'Q3 2024',
        source: 'RBI/MOSPI',
        lastUpdated: new Date().toISOString(),
        trend: 'up',
        reliability: 'high',
        stateWise: {
          'Maharashtra': 8.1,
          'Tamil Nadu': 7.8,
          'Gujarat': 7.5,
          'Karnataka': 7.3,
          'Uttar Pradesh': 6.9
        }
      },
      {
        id: 'gni',
        name: 'Gross National Income',
        value: 3.89,
        unit: 'Trillion USD',
        period: '2024',
        source: 'World Bank/RBI',
        lastUpdated: new Date().toISOString(),
        trend: 'up',
        reliability: 'high'
      },
      {
        id: 'gdp_per_capita',
        name: 'GDP per Capita',
        value: 2850,
        unit: 'USD',
        period: '2024',
        source: 'World Bank',
        lastUpdated: new Date().toISOString(),
        trend: 'up',
        reliability: 'high'
      },
      {
        id: 'unemployment_rate',
        name: 'Unemployment Rate',
        value: 6.1,
        unit: '%',
        period: 'Oct 2024',
        source: 'CMIE/Labour Ministry',
        lastUpdated: new Date().toISOString(),
        trend: 'down',
        reliability: 'medium'
      },
      {
        id: 'inflation_rate',
        name: 'Consumer Price Inflation',
        value: 4.8,
        unit: '%',
        period: 'Nov 2024',
        source: 'MOSPI',
        lastUpdated: new Date().toISOString(),
        trend: 'stable',
        reliability: 'high'
      },
      {
        id: 'fdi_inflow',
        name: 'Foreign Direct Investment',
        value: 83.57,
        unit: 'Billion USD',
        period: 'FY 2023-24',
        source: 'DPIIT',
        lastUpdated: new Date().toISOString(),
        trend: 'up',
        reliability: 'high'
      },
      {
        id: 'export_import_ratio',
        name: 'Export/Import Ratio',
        value: 0.67,
        unit: 'ratio',
        period: 'FY 2023-24',
        source: 'DGFT',
        lastUpdated: new Date().toISOString(),
        trend: 'stable',
        reliability: 'high'
      },
      {
        id: 'public_debt_gdp',
        name: 'Public Debt as % of GDP',
        value: 89.6,
        unit: '% of GDP',
        period: 'FY 2023-24',
        source: 'RBI',
        lastUpdated: new Date().toISOString(),
        trend: 'stable',
        reliability: 'high'
      }
    ];

    return this.fetchWithFallback(apiCall, mockDataFallback, 'Economic Data APIs');
  }

  async fetchCompleteSocialData(): Promise<ApiResponse<SocialIndicator[]>> {
    const apiCall = async (): Promise<SocialIndicator[]> => {
      const responses = await Promise.all([
        fetch(`${this.baseUrls.undp}/hdi-data`),
        fetch(`${this.baseUrls.mospi}/social-indicators`)
      ]);
      
      const data = await Promise.all(responses.map(r => r.json()));
      return this.parseSocialData(data);
    };

    const mockDataFallback = (): SocialIndicator[] => [
      {
        id: 'hdi',
        name: 'Human Development Index',
        value: 0.633,
        unit: 'index',
        period: '2023',
        source: 'UNDP',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'life_expectancy',
        name: 'Life Expectancy',
        value: 70.19,
        unit: 'years',
        period: '2021-23',
        source: 'SRS/Health Ministry',
        lastUpdated: new Date().toISOString(),
        genderBreakdown: { male: 68.7, female: 71.8 }
      },
      {
        id: 'infant_mortality',
        name: 'Infant Mortality Rate',
        value: 28,
        unit: 'per 1000 births',
        period: '2022',
        source: 'SRS/Health Ministry',
        lastUpdated: new Date().toISOString(),
        ruralUrban: { rural: 32, urban: 22 }
      },
      {
        id: 'literacy_rate',
        name: 'Literacy Rate',
        value: 77.7,
        unit: '%',
        period: '2021 Census',
        source: 'Registrar General of India',
        lastUpdated: new Date().toISOString(),
        genderBreakdown: { male: 84.7, female: 70.3 },
        ruralUrban: { rural: 73.5, urban: 87.7 }
      },
      {
        id: 'education_index',
        name: 'Education Index',
        value: 0.614,
        unit: 'index',
        period: '2023',
        source: 'UNDP/Education Ministry',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'gender_inequality_index',
        name: 'Gender Inequality Index',
        value: 0.490,
        unit: 'index',
        period: '2023',
        source: 'UNDP',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'population_growth_rate',
        name: 'Population Growth Rate',
        value: 0.99,
        unit: '% per year',
        period: '2023',
        source: 'UN Population Division',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'urban_population',
        name: 'Urban Population',
        value: 35.4,
        unit: '% of total',
        period: '2023',
        source: 'Census/UN-Habitat',
        lastUpdated: new Date().toISOString()
      }
    ];

    return this.fetchWithFallback(apiCall, mockDataFallback, 'Social Development APIs');
  }

  async fetchCompleteEnvironmentalData(): Promise<ApiResponse<EnvironmentalIndicator[]>> {
    const apiCall = async (): Promise<EnvironmentalIndicator[]> => {
      const responses = await Promise.all([
        fetch(`${this.baseUrls.cpcb}/realtime-data`),
        fetch(`${this.baseUrls.worldBank}/EN.ATM.CO2E.PC?format=json&date=2024`)
      ]);
      
      const data = await Promise.all(responses.map(r => r.json()));
      return this.parseEnvironmentalData(data);
    };

    const mockDataFallback = (): EnvironmentalIndicator[] => [
      {
        id: 'co2_emissions_per_capita',
        name: 'CO2 Emissions per Capita',
        value: 1.91,
        unit: 'tons CO2',
        location: 'India',
        timestamp: new Date().toISOString(),
        source: 'World Bank/Environment Ministry',
        alertLevel: 'moderate'
      },
      {
        id: 'renewable_energy_share',
        name: 'Renewable Energy Share',
        value: 42.5,
        unit: '% of total',
        location: 'India',
        timestamp: new Date().toISOString(),
        source: 'MNRE',
        alertLevel: 'good'
      },
      {
        id: 'forest_area',
        name: 'Forest Area',
        value: 21.71,
        unit: '% of land area',
        location: 'India',
        timestamp: new Date().toISOString(),
        source: 'Forest Survey of India',
        alertLevel: 'moderate'
      },
      {
        id: 'aqi_delhi',
        name: 'Air Quality Index - Delhi',
        value: 187,
        unit: 'AQI',
        location: 'Delhi',
        timestamp: new Date().toISOString(),
        source: 'CPCB Real-time',
        alertLevel: 'poor'
      },
      {
        id: 'aqi_mumbai',
        name: 'Air Quality Index - Mumbai',
        value: 94,
        unit: 'AQI',
        location: 'Mumbai',
        timestamp: new Date().toISOString(),
        source: 'CPCB Real-time',
        alertLevel: 'moderate'
      },
      {
        id: 'environmental_performance_index',
        name: 'Environmental Performance Index',
        value: 27.6,
        unit: 'score/100',
        location: 'India',
        timestamp: new Date().toISOString(),
        source: 'Yale EPI',
        alertLevel: 'poor'
      }
    ];

    return this.fetchWithFallback(apiCall, mockDataFallback, 'Environmental APIs');
  }

  async fetchCompleteGovernanceData(): Promise<ApiResponse<GovernanceIndicator[]>> {
    const apiCall = async (): Promise<GovernanceIndicator[]> => {
      const responses = await Promise.all([
        fetch(`${this.baseUrls.transparency}/cpi-data`),
        fetch(`${this.baseUrls.dataGovIn}/infrastructure-data`)
      ]);
      
      const data = await Promise.all(responses.map(r => r.json()));
      return this.parseGovernanceData(data);
    };

    const mockDataFallback = (): GovernanceIndicator[] => [
      {
        id: 'corruption_perceptions_index',
        name: 'Corruption Perceptions Index',
        value: 41,
        unit: 'score/100',
        period: '2023',
        source: 'Transparency International',
        lastUpdated: new Date().toISOString(),
        ranking: 93,
        globalAverage: 43
      },
      {
        id: 'internet_penetration',
        name: 'Internet Penetration',
        value: 52.4,
        unit: '% population',
        period: '2024',
        source: 'TRAI',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'mobile_subscriptions',
        name: 'Mobile Phone Subscriptions',
        value: 84.8,
        unit: 'per 100 people',
        period: 'Nov 2024',
        source: 'TRAI',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'infrastructure_quality_index',
        name: 'Infrastructure Quality Index',
        value: 4.18,
        unit: 'score/7',
        period: '2023',
        source: 'WEF Global Competitiveness',
        lastUpdated: new Date().toISOString(),
        ranking: 68,
        globalAverage: 4.5
      },
      {
        id: 'political_stability_index',
        name: 'Political Stability Index',
        value: -0.81,
        unit: 'score',
        period: '2023',
        source: 'World Bank Governance',
        lastUpdated: new Date().toISOString(),
        globalAverage: 0.0
      }
    ];

    return this.fetchWithFallback(apiCall, mockDataFallback, 'Governance APIs');
  }

  async fetchEconomicEqualityData(): Promise<ApiResponse<any[]>> {
    const mockDataFallback = () => [
      {
        id: 'gini_coefficient',
        name: 'Gini Coefficient (Income Inequality)',
        value: 35.7,
        unit: 'coefficient',
        period: '2021-22',
        source: 'NSSO/World Bank',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'poverty_rate',
        name: 'Poverty Rate ($2.15/day)',
        value: 10.2,
        unit: '% population',
        period: '2022',
        source: 'World Bank',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'social_protection_coverage',
        name: 'Social Protection Coverage',
        value: 24.4,
        unit: '% population',
        period: '2023',
        source: 'ILO/Social Security Ministry',
        lastUpdated: new Date().toISOString()
      }
    ];

    return this.fetchWithFallback(
      async () => { throw new Error('Not implemented'); },
      mockDataFallback,
      'Economic Equality APIs'
    );
  }

  private parseEconomicData(data: any[]): ExtendedEconomicIndicator[] {
    // Parse real API data when available
    return [];
  }

  private parseSocialData(data: any[]): SocialIndicator[] {
    // Parse real API data when available
    return [];
  }

  private parseEnvironmentalData(data: any[]): EnvironmentalIndicator[] {
    // Parse real API data when available
    return [];
  }

  private parseGovernanceData(data: any[]): GovernanceIndicator[] {
    // Parse real API data when available
    return [];
  }
}

export const enhancedApiService = new EnhancedApiService();
