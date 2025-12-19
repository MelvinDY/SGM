import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  toggleProductFeatured,
} from '@/services/products'
import type { Product, ProductCategory } from '@/types/database'

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  admin: () => [...productKeys.all, 'admin'] as const,
}

// Public hooks
export function useProducts() {
  return useQuery({
    queryKey: productKeys.list('all'),
    queryFn: getProducts,
  })
}

export function useProductsByCategory(category: ProductCategory) {
  return useQuery({
    queryKey: productKeys.list(category),
    queryFn: () => getProductsByCategory(category),
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: getFeaturedProducts,
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}

// Admin hooks
export function useAllProducts() {
  return useQuery({
    queryKey: productKeys.admin(),
    queryFn: getAllProducts,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>> }) =>
      updateProduct(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useToggleProductActive() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleProductActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useToggleProductFeatured() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isFeatured }: { id: string; isFeatured: boolean }) =>
      toggleProductFeatured(id, isFeatured),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}
