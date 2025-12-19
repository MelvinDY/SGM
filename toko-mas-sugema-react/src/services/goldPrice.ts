// Gold Price Service
// Uses GoldAPI.io - Get your free API key at https://www.goldapi.io/

export interface GoldPrice {
  price: number // Price per gram in IDR
  pricePerOunce: number // Price per troy ounce in USD
  currency: string
  timestamp: string
  change: number // Change from previous
  changePercent: number
}

export interface GoldPriceHistory {
  today: GoldPrice
  yesterday: GoldPrice | null
  weekAgo: GoldPrice | null
  monthAgo: GoldPrice | null
  yearAgo: GoldPrice | null
}

// Convert USD per troy ounce to IDR per gram
// 1 troy ounce = 31.1035 grams
const TROY_OUNCE_TO_GRAM = 31.1035
const USD_TO_IDR = 15500 // Approximate exchange rate, should be fetched dynamically

function convertToIDRPerGram(usdPerOunce: number, exchangeRate: number = USD_TO_IDR): number {
  return (usdPerOunce / TROY_OUNCE_TO_GRAM) * exchangeRate
}

// Fetch current gold price from GoldAPI
export async function fetchGoldPrice(): Promise<GoldPrice> {
  const apiKey = import.meta.env.VITE_GOLD_API_KEY

  if (!apiKey) {
    // Return mock data if no API key
    return getMockCurrentPrice()
  }

  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch gold price')
    }

    const data = await response.json()

    return {
      price: convertToIDRPerGram(data.price),
      pricePerOunce: data.price,
      currency: 'IDR',
      timestamp: new Date(data.timestamp * 1000).toISOString(),
      change: convertToIDRPerGram(data.ch),
      changePercent: data.chp,
    }
  } catch (error) {
    console.error('Error fetching gold price:', error)
    return getMockCurrentPrice()
  }
}

// Fetch historical gold price
export async function fetchHistoricalGoldPrice(date: Date): Promise<GoldPrice | null> {
  const apiKey = import.meta.env.VITE_GOLD_API_KEY

  if (!apiKey) {
    return getMockHistoricalPrice(date)
  }

  try {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')
    const response = await fetch(`https://www.goldapi.io/api/XAU/USD/${dateStr}`, {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    return {
      price: convertToIDRPerGram(data.price),
      pricePerOunce: data.price,
      currency: 'IDR',
      timestamp: new Date(data.timestamp * 1000).toISOString(),
      change: 0,
      changePercent: 0,
    }
  } catch (error) {
    console.error('Error fetching historical gold price:', error)
    return getMockHistoricalPrice(date)
  }
}

// Get all price history
export async function fetchGoldPriceHistory(): Promise<GoldPriceHistory> {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const monthAgo = new Date(today)
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const yearAgo = new Date(today)
  yearAgo.setFullYear(yearAgo.getFullYear() - 1)

  const [currentPrice, yesterdayPrice, weekAgoPrice, monthAgoPrice, yearAgoPrice] =
    await Promise.all([
      fetchGoldPrice(),
      fetchHistoricalGoldPrice(yesterday),
      fetchHistoricalGoldPrice(weekAgo),
      fetchHistoricalGoldPrice(monthAgo),
      fetchHistoricalGoldPrice(yearAgo),
    ])

  return {
    today: currentPrice,
    yesterday: yesterdayPrice,
    weekAgo: weekAgoPrice,
    monthAgo: monthAgoPrice,
    yearAgo: yearAgoPrice,
  }
}

// Calculate change between two prices
export function calculateChange(
  current: number,
  previous: number | null
): { change: number; changePercent: number } {
  if (!previous) return { change: 0, changePercent: 0 }
  const change = current - previous
  const changePercent = ((current - previous) / previous) * 100
  return { change, changePercent }
}

// Mock data for development/demo
function getMockCurrentPrice(): GoldPrice {
  // Simulate realistic gold price (around $2000-2100 per ounce in late 2024)
  const basePrice = 2050 + (Math.random() * 50 - 25) // Random fluctuation
  const pricePerGram = convertToIDRPerGram(basePrice)

  return {
    price: Math.round(pricePerGram),
    pricePerOunce: basePrice,
    currency: 'IDR',
    timestamp: new Date().toISOString(),
    change: Math.round((Math.random() * 20000 - 10000)),
    changePercent: Math.random() * 2 - 1,
  }
}

function getMockHistoricalPrice(date: Date): GoldPrice {
  const today = new Date()
  const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  // Simulate price history with some variation
  // Gold generally trends upward over time
  const basePrice = 2050
  const variation = daysDiff * 0.5 + (Math.random() * 30 - 15)
  const historicalPrice = basePrice - variation

  return {
    price: Math.round(convertToIDRPerGram(historicalPrice)),
    pricePerOunce: historicalPrice,
    currency: 'IDR',
    timestamp: date.toISOString(),
    change: 0,
    changePercent: 0,
  }
}

// Format price to Indonesian Rupiah
export function formatIDR(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format USD price
export function formatUSD(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}
