export type ProductCategory = 'Cincin' | 'Kalung' | 'Gelang' | 'Anting'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  weight: string
  karat: string
  price: number | null
  description: string | null
  image_url: string
  instagram_post_id: string | null
  instagram_permalink: string | null
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface InstagramSyncLog {
  id: string
  synced_at: string
  posts_added: number
  status: 'success' | 'failed' | 'partial'
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'editor'
  created_at: string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>
export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: ProductInsert
        Update: ProductUpdate
      }
      instagram_sync_log: {
        Row: InstagramSyncLog
        Insert: Omit<InstagramSyncLog, 'id'>
        Update: Partial<Omit<InstagramSyncLog, 'id'>>
      }
      admin_users: {
        Row: AdminUser
        Insert: Omit<AdminUser, 'created_at'>
        Update: Partial<Omit<AdminUser, 'id' | 'created_at'>>
      }
    }
  }
}

// Hashtag to category mapping
export const HASHTAG_CATEGORY_MAP: Record<string, ProductCategory> = {
  '#cincin': 'Cincin',
  '#kalung': 'Kalung',
  '#gelang': 'Gelang',
  '#anting': 'Anting',
}

export const CATEGORIES: ProductCategory[] = ['Cincin', 'Kalung', 'Gelang', 'Anting']
