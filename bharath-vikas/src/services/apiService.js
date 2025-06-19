
import { QueryClient } from '@tanstack/react-query';

class ApiService {
  constructor() {
    this.baseUrls = {
      dataGovIn: 'https://api.data.gov.in/resource',
      rbi: 'https://rbi.org.in/Scripts/api',
      cpcb: 'https://api.cpcb.gov.in/air',
      mospi: 'https://mospi.gov.in/api',
      cowin: 'https://cdn-api.co-vin.in/api'
    };

    // Removed process.env reference to fix browser compatibility
    this.apiKeys = {
      dataGovIn: '', // Will be empty for now, can be configured later
    };
  }

  async fetchEconomicData() {
    try {
      // Simulating real API calls with mock data that would come from government APIs
      const mockData = [
        {
          id: 'gdp_growth',
          name: 'GDP Growth Rate',
          value: 7.2,
          unit: '%',
          period: 'Q3 2024',
          source: 'RBI/MOSPI',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'inflation_rate',
          name: 'Consumer Price Inflation',
          value: 4.8,
          unit: '%',
          period: 'Nov 2024',
          source: 'MOSPI',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'unemployment_rate',
          name: 'Unemployment Rate',
          value: 6.1,
          unit: '%',
          period: 'Oct 2024',
          source: 'CMIE/Labour Ministry',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'fdi_inflow',
          name: 'Foreign Direct Investment',
          value: 83.57,
          unit: 'Billion USD',
          period: 'FY 2023-24',
          source: 'DPIIT',
          lastUpdated: new Date().toISOString()
        }
      ];

      return {
        data: mockData,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: 'Government APIs Aggregated'
      };
    } catch (error) {
      console.error('Error fetching economic data:', error);
      return {
        data: [],
        status: 'error',
        message: 'Failed to fetch economic data',
        lastUpdated: new Date().toISOString(),
        source: 'Error'
      };
    }
  }

  async fetchSocialData() {
    try {
      const mockData = [
        {
          id: 'literacy_rate',
          name: 'Literacy Rate',
          value: 77.7,
          unit: '%',
          period: '2021 Census',
          source: 'Registrar General of India',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'life_expectancy',
          name: 'Life Expectancy',
          value: 70.19,
          unit: 'years',
          period: '2021-23',
          source: 'SRS/Health Ministry',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'infant_mortality',
          name: 'Infant Mortality Rate',
          value: 28,
          unit: 'per 1000 births',
          period: '2022',
          source: 'SRS/Health Ministry',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'gender_parity',
          name: 'Gender Parity Index',
          value: 0.94,
          unit: 'ratio',
          period: '2023',
          source: 'Education Ministry',
          lastUpdated: new Date().toISOString()
        }
      ];

      return {
        data: mockData,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: 'Social Development APIs'
      };
    } catch (error) {
      console.error('Error fetching social data:', error);
      return {
        data: [],
        status: 'error',
        message: 'Failed to fetch social data',
        lastUpdated: new Date().toISOString(),
        source: 'Error'
      };
    }
  }

  async fetchEnvironmentalData() {
    try {
      const mockData = [
        {
          id: 'aqi_delhi',
          name: 'Air Quality Index',
          value: 187,
          unit: 'AQI',
          location: 'Delhi',
          timestamp: new Date().toISOString(),
          source: 'CPCB Real-time'
        },
        {
          id: 'aqi_mumbai',
          name: 'Air Quality Index',
          value: 94,
          unit: 'AQI',
          location: 'Mumbai',
          timestamp: new Date().toISOString(),
          source: 'CPCB Real-time'
        },
        {
          id: 'renewable_energy',
          name: 'Renewable Energy Share',
          value: 42.5,
          unit: '%',
          location: 'India',
          timestamp: new Date().toISOString(),
          source: 'MNRE'
        },
        {
          id: 'forest_cover',
          name: 'Forest Cover',
          value: 21.71,
          unit: '% of land area',
          location: 'India',
          timestamp: new Date().toISOString(),
          source: 'Forest Survey of India'
        }
      ];

      return {
        data: mockData,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: 'Environmental Monitoring APIs'
      };
    } catch (error) {
      console.error('Error fetching environmental data:', error);
      return {
        data: [],
        status: 'error',
        message: 'Failed to fetch environmental data',
        lastUpdated: new Date().toISOString(),
        source: 'Error'
      };
    }
  }

  async fetchHealthData() {
    try {
      const mockData = [
        {
          id: 'healthcare_expenditure',
          name: 'Healthcare Expenditure per Capita',
          value: 73,
          unit: 'USD',
          period: '2022',
          source: 'WHO/Health Ministry',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'doctors_per_1000',
          name: 'Doctors per 1000 people',
          value: 0.86,
          unit: 'per 1000',
          period: '2023',
          source: 'Medical Council of India',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'hospital_beds',
          name: 'Hospital Beds per 1000 people',
          value: 0.53,
          unit: 'per 1000',
          period: '2023',
          source: 'Health Ministry',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'vaccination_coverage',
          name: 'COVID-19 Vaccination Coverage',
          value: 94.2,
          unit: '% population',
          period: 'Dec 2024',
          source: 'CoWIN Dashboard',
          lastUpdated: new Date().toISOString()
        }
      ];

      return {
        data: mockData,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: 'Health Sector APIs'
      };
    } catch (error) {
      console.error('Error fetching health data:', error);
      return {
        data: [],
        status: 'error',
        message: 'Failed to fetch health data',
        lastUpdated: new Date().toISOString(),
        source: 'Error'
      };
    }
  }

  async fetchGovernanceData() {
    try {
      const mockData = [
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
          value: 1157.49,
          unit: 'million',
          period: 'Nov 2024',
          source: 'TRAI',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'digital_payments',
          name: 'Digital Payment Transactions',
          value: 13.4,
          unit: 'billion/month',
          period: 'Nov 2024',
          source: 'NPCI/RBI',
          lastUpdated: new Date().toISOString()
        }
      ];

      return {
        data: mockData,
        status: 'success',
        lastUpdated: new Date().toISOString(),
        source: 'Governance & Digital India APIs'
      };
    } catch (error) {
      console.error('Error fetching governance data:', error);
      return {
        data: [],
        status: 'error',
        message: 'Failed to fetch governance data',
        lastUpdated: new Date().toISOString(),
        source: 'Error'
      };
    }
  }
}

export const apiService = new ApiService();
