
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { enhancedApiService } from '@/services/enhancedApiService';

export const ENHANCED_QUERY_KEYS = {
  COMPLETE_ECONOMIC_DATA: ['complete-economic-data'],
  COMPLETE_SOCIAL_DATA: ['complete-social-data'],
  COMPLETE_ENVIRONMENTAL_DATA: ['complete-environmental-data'],
  COMPLETE_GOVERNANCE_DATA: ['complete-governance-data'],
  ECONOMIC_EQUALITY_DATA: ['economic-equality-data'],
} as const;

export const useCompleteEconomicData = () => {
  return useQuery({
    queryKey: ENHANCED_QUERY_KEYS.COMPLETE_ECONOMIC_DATA,
    queryFn: () => enhancedApiService.fetchCompleteEconomicData(),
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCompleteSocialData = () => {
  return useQuery({
    queryKey: ENHANCED_QUERY_KEYS.COMPLETE_SOCIAL_DATA,
    queryFn: () => enhancedApiService.fetchCompleteSocialData(),
    refetchInterval: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCompleteEnvironmentalData = () => {
  return useQuery({
    queryKey: ENHANCED_QUERY_KEYS.COMPLETE_ENVIRONMENTAL_DATA,
    queryFn: () => enhancedApiService.fetchCompleteEnvironmentalData(),
    refetchInterval: 2 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCompleteGovernanceData = () => {
  return useQuery({
    queryKey: ENHANCED_QUERY_KEYS.COMPLETE_GOVERNANCE_DATA,
    queryFn: () => enhancedApiService.fetchCompleteGovernanceData(),
    refetchInterval: 30 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useEconomicEqualityData = () => {
  return useQuery({
    queryKey: ENHANCED_QUERY_KEYS.ECONOMIC_EQUALITY_DATA,
    queryFn: () => enhancedApiService.fetchEconomicEqualityData(),
    refetchInterval: 60 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useAllEnhancedData = () => {
  const economicQuery = useCompleteEconomicData();
  const socialQuery = useCompleteSocialData();
  const environmentalQuery = useCompleteEnvironmentalData();
  const governanceQuery = useCompleteGovernanceData();
  const equalityQuery = useEconomicEqualityData();

  return {
    economic: economicQuery,
    social: socialQuery,
    environmental: environmentalQuery,
    governance: governanceQuery,
    equality: equalityQuery,
    isLoading: economicQuery.isLoading || socialQuery.isLoading || 
               environmentalQuery.isLoading || governanceQuery.isLoading || 
               equalityQuery.isLoading,
    isError: economicQuery.isError || socialQuery.isError || 
             environmentalQuery.isError || governanceQuery.isError || 
             equalityQuery.isError,
    lastUpdated: Math.max(
      economicQuery.dataUpdatedAt,
      socialQuery.dataUpdatedAt,
      environmentalQuery.dataUpdatedAt,
      governanceQuery.dataUpdatedAt,
      equalityQuery.dataUpdatedAt
    )
  };
};

export const useManualEnhancedRefresh = () => {
  const queryClient = useQueryClient();

  const refreshAllData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ENHANCED_QUERY_KEYS.COMPLETE_ECONOMIC_DATA }),
      queryClient.invalidateQueries({ queryKey: ENHANCED_QUERY_KEYS.COMPLETE_SOCIAL_DATA }),
      queryClient.invalidateQueries({ queryKey: ENHANCED_QUERY_KEYS.COMPLETE_ENVIRONMENTAL_DATA }),
      queryClient.invalidateQueries({ queryKey: ENHANCED_QUERY_KEYS.COMPLETE_GOVERNANCE_DATA }),
      queryClient.invalidateQueries({ queryKey: ENHANCED_QUERY_KEYS.ECONOMIC_EQUALITY_DATA }),
    ]);
  };

  const refreshSpecificData = async (dataType: keyof typeof ENHANCED_QUERY_KEYS) => {
    await queryClient.invalidateQueries({ queryKey: ENHANCED_QUERY_KEYS[dataType] });
  };

  return {
    refreshAllData,
    refreshSpecificData,
  };
};
