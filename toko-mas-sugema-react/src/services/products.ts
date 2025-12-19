import { supabase } from '@/config/supabase'
import type { Product, ProductCategory, ProductInsert, ProductUpdate } from '@/types/database'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) throw error
  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Admin functions
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createProduct(product: ProductInsert): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product as never)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, updates: ProductUpdate): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(updates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleProductActive(id: string, isActive: boolean): Promise<Product> {
  return updateProduct(id, { is_active: isActive })
}

export async function toggleProductFeatured(id: string, isFeatured: boolean): Promise<Product> {
  return updateProduct(id, { is_featured: isFeatured })
}
