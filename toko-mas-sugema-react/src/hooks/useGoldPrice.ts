import { useQuery } from '@tanstack/react-query'
import { fetchGoldPrice, fetchGoldPriceHistory } from '@/services/goldPrice'

export function useGoldPrice() {
  return useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldPrice,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  })
}

export function useGoldPriceHistory() {
  return useQuery({
    queryKey: ['goldPriceHistory'],
    queryFn: fetchGoldPriceHistory,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchInterval: 1000 * 60 * 15, // Refetch every 15 minutes
  })
}
