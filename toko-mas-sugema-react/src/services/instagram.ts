import { HASHTAG_CATEGORY_MAP } from '@/types/database'
import type { ProductCategory } from '@/types/database'

export interface InstagramPost {
  id: string
  caption: string
  media_url: string
  permalink: string
  timestamp: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
}

export interface ParsedInstagramPost extends InstagramPost {
  detectedCategory: ProductCategory | null
  suggestedName: string
}

// Parse caption to detect category from hashtags
export function detectCategoryFromCaption(caption: string): ProductCategory | null {
  const lowerCaption = caption.toLowerCase()

  for (const [hashtag, category] of Object.entries(HASHTAG_CATEGORY_MAP)) {
    if (lowerCaption.includes(hashtag)) {
      return category
    }
  }

  return null
}

// Extract a suggested name from caption (first line or first sentence)
export function extractNameFromCaption(caption: string): string {
  // Remove hashtags
  const withoutHashtags = caption.replace(/#\w+/g, '').trim()

  // Get first line
  const firstLine = withoutHashtags.split('\n')[0].trim()

  // If first line is too short or empty, use generic name
  if (firstLine.length < 3) {
    return 'Perhiasan Emas'
  }

  // Truncate if too long
  if (firstLine.length > 50) {
    return firstLine.substring(0, 47) + '...'
  }

  return firstLine
}

// Parse Instagram posts and add category detection
export function parseInstagramPosts(posts: InstagramPost[]): ParsedInstagramPost[] {
  return posts.map((post) => ({
    ...post,
    detectedCategory: detectCategoryFromCaption(post.caption || ''),
    suggestedName: extractNameFromCaption(post.caption || ''),
  }))
}

// Fetch Instagram posts (this would call your Supabase Edge Function)
export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN
  const businessId = import.meta.env.VITE_INSTAGRAM_BUSINESS_ID

  if (!accessToken || !businessId) {
    throw new Error('Instagram credentials not configured')
  }

  // In production, this should call your Supabase Edge Function
  // to avoid exposing the access token in the frontend
  const response = await fetch(
    `https://graph.instagram.com/${businessId}/media?fields=id,caption,media_url,permalink,timestamp,media_type&access_token=${accessToken}&limit=20`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Instagram posts')
  }

  const data = await response.json()
  return data.data || []
}

// Mock data for development/demo
export function getMockInstagramPosts(): ParsedInstagramPost[] {
  return [
    {
      id: 'mock_1',
      caption: 'Cincin Berlian Premium\n\nDesain eksklusif dengan berlian asli berkualitas tinggi.\n\n#cincin #emas24k #perhiasan',
      media_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      permalink: 'https://instagram.com/p/mock1',
      timestamp: new Date().toISOString(),
      media_type: 'IMAGE',
      detectedCategory: 'Cincin',
      suggestedName: 'Cincin Berlian Premium',
    },
    {
      id: 'mock_2',
      caption: 'Kalung Emas Italian Style\n\nRantai halus dengan finishing mewah.\n\n#kalung #emas #italian',
      media_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      permalink: 'https://instagram.com/p/mock2',
      timestamp: new Date().toISOString(),
      media_type: 'IMAGE',
      detectedCategory: 'Kalung',
      suggestedName: 'Kalung Emas Italian Style',
    },
    {
      id: 'mock_3',
      caption: 'Gelang Emas Ukir Tradisional\n\nMotif ukir khas Indonesia.\n\n#gelang #emas24k #tradisional',
      media_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
      permalink: 'https://instagram.com/p/mock3',
      timestamp: new Date().toISOString(),
      media_type: 'IMAGE',
      detectedCategory: 'Gelang',
      suggestedName: 'Gelang Emas Ukir Tradisional',
    },
    {
      id: 'mock_4',
      caption: 'Anting Mutiara Elegan\n\nMutiara air tawar pilihan.\n\n#anting #mutiara #elegan',
      media_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      permalink: 'https://instagram.com/p/mock4',
      timestamp: new Date().toISOString(),
      media_type: 'IMAGE',
      detectedCategory: 'Anting',
      suggestedName: 'Anting Mutiara Elegan',
    },
  ]
}
