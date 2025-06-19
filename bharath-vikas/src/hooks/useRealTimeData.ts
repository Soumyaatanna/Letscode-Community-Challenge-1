
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService, type ApiResponse, type EconomicIndicator, type SocialIndicator, type EnvironmentalIndicator, type HealthIndicator } from '@/services/apiService';

// Query keys for different data types
export const QUERY_KEYS = {
  ECONOMIC_DATA: ['economic-data'],
  SOCIAL_DATA: ['social-data'],
  ENVIRONMENTAL_DATA: ['environmental-data'],
  HEALTH_DATA: ['health-data'],
  GOVERNANCE_DATA: ['governance-data'],
} as const;

// Real-time economic data hook
export const useEconomicData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ECONOMIC_DATA,
    queryFn: () => apiService.fetchEconomicData(),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Data is stale after 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Real-time social data hook
export const useSocialData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SOCIAL_DATA,
    queryFn: () => apiService.fetchSocialData(),
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes (social data changes less frequently)
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Real-time environmental data hook
export const useEnvironmentalData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ENVIRONMENTAL_DATA,
    queryFn: () => apiService.fetchEnvironmentalData(),
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes (environmental data like AQI changes frequently)
    staleTime: 1 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Real-time health data hook
export const useHealthData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.HEALTH_DATA,
    queryFn: () => apiService.fetchHealthData(),
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Real-time governance data hook
export const useGovernanceData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GOVERNANCE_DATA,
    queryFn: () => apiService.fetchGovernanceData(),
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    staleTime: 15 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Combined real-time data hook
export const useAllRealTimeData = () => {
  const economicQuery = useEconomicData();
  const socialQuery = useSocialData();
  const environmentalQuery = useEnvironmentalData();
  const healthQuery = useHealthData();
  const governanceQuery = useGovernanceData();

  return {
    economic: economicQuery,
    social: socialQuery,
    environmental: environmentalQuery,
    health: healthQuery,
    governance: governanceQuery,
    isLoading: economicQuery.isLoading || socialQuery.isLoading || environmentalQuery.isLoading || healthQuery.isLoading || governanceQuery.isLoading,
    isError: economicQuery.isError || socialQuery.isError || environmentalQuery.isError || healthQuery.isError || governanceQuery.isError,
    lastUpdated: Math.max(
      economicQuery.dataUpdatedAt,
      socialQuery.dataUpdatedAt,
      environmentalQuery.dataUpdatedAt,
      healthQuery.dataUpdatedAt,
      governanceQuery.dataUpdatedAt
    )
  };
};

// Manual refresh hook
export const useManualRefresh = () => {
  const queryClient = useQueryClient();

  const refreshAllData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ECONOMIC_DATA }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SOCIAL_DATA }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ENVIRONMENTAL_DATA }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HEALTH_DATA }),
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GOVERNANCE_DATA }),
    ]);
  };

  const refreshSpecificData = async (dataType: keyof typeof QUERY_KEYS) => {
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS[dataType] });
  };

  return {
    refreshAllData,
    refreshSpecificData,
  };
};
