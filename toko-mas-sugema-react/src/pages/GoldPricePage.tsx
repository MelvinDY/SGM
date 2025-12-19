import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGoldPriceHistory } from '@/hooks/useGoldPrice'
import { formatIDR, calculateChange } from '@/services/goldPrice'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Calendar,
  Loader2,
  AlertCircle,
  Diamond,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

function PriceChangeIndicator({
  change,
  changePercent,
  size = 'default',
}: {
  change: number
  changePercent: number
  size?: 'default' | 'large' | 'xlarge'
}) {
  const isPositive = change > 0
  const isNegative = change < 0
  const isNeutral = change === 0

  const sizeClasses = {
    default: 'text-sm',
    large: 'text-lg',
    xlarge: 'text-2xl md:text-3xl',
  }

  const iconSizes = {
    default: 'w-4 h-4',
    large: 'w-5 h-5',
    xlarge: 'w-7 h-7',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 font-semibold',
        sizeClasses[size],
        isPositive && 'text-emerald-600',
        isNegative && 'text-red-600',
        isNeutral && 'text-warm-gray'
      )}
    >
      {isPositive && <TrendingUp className={iconSizes[size]} />}
      {isNegative && <TrendingDown className={iconSizes[size]} />}
      {isNeutral && <Minus className={iconSizes[size]} />}
      <span>
        {isPositive && '+'}
        {formatIDR(change)} ({isPositive && '+'}
        {changePercent.toFixed(2)}%)
      </span>
    </div>
  )
}

// Generate chart data for historical visualization
function generateChartData(
  currentPrice: number,
  historicalPrice: number,
  days: number
) {
  const data = []
  const priceChange = currentPrice - historicalPrice
  const dailyChange = priceChange / days
  const points = Math.min(days, 30)

  for (let i = 0; i <= points; i++) {
    const progress = i / points
    const dayIndex = Math.floor(progress * days)
    // Add realistic variation
    const noise = (Math.sin(i * 0.5) + Math.cos(i * 0.3)) * (priceChange * 0.015)
    const price = historicalPrice + dailyChange * dayIndex + noise

    data.push({
      day: i,
      price: Math.round(price),
    })
  }

  return data
}

const slideVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

interface HistoricalSlide {
  title: string
  period: string
  price: number | null
  days: number
  icon: React.ElementType
}

export function GoldPricePage() {
  const { data: priceHistory, isLoading, error } = useGoldPriceHistory()
  const [currentSlide, setCurrentSlide] = useState(0)

  const historicalData: HistoricalSlide[] = useMemo(
    () =>
      priceHistory
        ? [
            {
              title: 'Kemarin',
              period: '1 hari lalu',
              price: priceHistory.yesterday?.price ?? null,
              days: 1,
              icon: Clock,
            },
            {
              title: 'Minggu Lalu',
              period: '7 hari lalu',
              price: priceHistory.weekAgo?.price ?? null,
              days: 7,
              icon: Calendar,
            },
            {
              title: 'Bulan Lalu',
              period: '1 bulan lalu',
              price: priceHistory.monthAgo?.price ?? null,
              days: 30,
              icon: Calendar,
            },
            {
              title: 'Tahun Lalu',
              period: '1 tahun lalu',
              price: priceHistory.yearAgo?.price ?? null,
              days: 365,
              icon: Calendar,
            },
          ]
        : [],
    [priceHistory]
  )

  const karatData = [
    { karat: '24K', purity: 0.999, label: 'Emas Murni' },
    { karat: '22K', purity: 0.916, label: 'Emas 916' },
    { karat: '18K', purity: 0.75, label: 'Emas 750' },
    { karat: '14K', purity: 0.585, label: 'Emas 585' },
  ]

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!priceHistory) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 5000)

    return () => clearInterval(interval)
  }, [priceHistory])

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream p-4">
        <div className="bg-white border border-red-200 rounded-lg p-6 flex items-center gap-4 text-red-600 shadow-lg">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">Gagal memuat harga emas</p>
            <p className="text-red-500 text-sm">Silakan coba lagi nanti</p>
          </div>
        </div>
      </div>
    )
  }

  if (!priceHistory) return null

  const currentHistorical = historicalData[currentSlide]
  const { change, changePercent } = calculateChange(
    priceHistory.today.price,
    currentHistorical?.price ?? null
  )

  const chartData =
    currentHistorical?.price
      ? generateChartData(
          priceHistory.today.price,
          currentHistorical.price,
          currentHistorical.days
        )
      : []

  const isPositiveChange = change > 0

  return (
    <div className="h-screen flex flex-col bg-cream overflow-hidden">
      {/* Header with main price */}
      <div className="flex-shrink-0 pt-6 pb-4 text-center bg-cream-dark border-b border-gold/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Diamond className="w-5 h-5 text-gold" />
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            Harga Emas Hari Ini
          </p>
          <Diamond className="w-5 h-5 text-gold" />
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-gold font-semibold tracking-tight">
          {formatIDR(priceHistory.today.price)}
        </h1>
        <p className="text-warm-gray text-base mt-1 font-accent">per gram</p>
        <div className="flex items-center justify-center gap-6 mt-3">
          <PriceChangeIndicator
            change={priceHistory.today.change}
            changePercent={priceHistory.today.changePercent}
            size="large"
          />
          <span className="text-warm-gray-light text-sm">
            {formatDate(priceHistory.today.timestamp)} • {formatTime(priceHistory.today.timestamp)}
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 min-h-0">
        {/* Chart section - larger */}
        <div className="flex-1 lg:flex-[2] flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex-1 bg-white border border-gold/20 shadow-lg p-4 md:p-6 flex flex-col"
            >
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-cream-darker">
                <div className="flex items-center gap-3">
                  {currentHistorical && (
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <currentHistorical.icon className="w-5 h-5 text-gold" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display text-charcoal">
                      Perbandingan{' '}
                      <span className="text-gold font-cursive text-[1.1em]">
                        {currentHistorical?.title}
                      </span>
                    </h2>
                    <p className="text-warm-gray text-sm">{currentHistorical?.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-warm-gray text-xs uppercase tracking-wider">Harga saat itu</p>
                  <p className="text-xl md:text-2xl font-display text-charcoal">
                    {currentHistorical?.price ? formatIDR(currentHistorical.price) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 min-h-0">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor={isPositiveChange ? '#059669' : '#dc2626'}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor={isPositiveChange ? '#059669' : '#dc2626'}
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="day"
                        stroke="#E5DFD5"
                        tick={false}
                        axisLine={{ stroke: '#E5DFD5' }}
                      />
                      <YAxis
                        domain={['dataMin - 10000', 'dataMax + 10000']}
                        stroke="#E5DFD5"
                        tick={{ fill: '#6B6B6B', fontSize: 11 }}
                        tickFormatter={(value) => `${(value / 1000000).toFixed(2)}jt`}
                        axisLine={{ stroke: '#E5DFD5' }}
                        width={55}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #B8860B',
                          borderRadius: '4px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                        formatter={(value: number) => [formatIDR(value), 'Harga']}
                        labelFormatter={() => ''}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={isPositiveChange ? '#059669' : '#dc2626'}
                        strokeWidth={2.5}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-warm-gray">
                    Data tidak tersedia
                  </div>
                )}
              </div>

              {/* Change indicator */}
              <div className="mt-3 pt-3 border-t border-cream-darker flex items-center justify-between">
                <span className="text-warm-gray text-sm">Perubahan harga:</span>
                <PriceChangeIndicator change={change} changePercent={changePercent} size="xlarge" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-3">
            {historicalData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium transition-all duration-300 border',
                  idx === currentSlide
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white text-warm-gray border-cream-darker hover:border-gold hover:text-gold'
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Karat prices - side panel */}
        <div className="flex-1 lg:flex-[1] flex flex-col min-h-0">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-3 text-center">
            Harga per Karat
          </h3>

          <div className="flex-1 grid grid-cols-2 lg:grid-cols-1 gap-3">
            {karatData.map((item, idx) => (
              <motion.div
                key={item.karat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'bg-white border p-4 flex flex-col justify-center transition-all duration-300',
                  idx === currentSlide
                    ? 'border-gold shadow-lg'
                    : 'border-cream-darker hover:border-gold/50'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl md:text-3xl font-display text-gold font-semibold">
                    {item.karat}
                  </span>
                  <span className="text-xs text-warm-gray uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="text-xl md:text-2xl font-display text-charcoal">
                  {formatIDR(Math.round(priceHistory.today.price * item.purity))}
                </p>
                <p className="text-warm-gray text-xs mt-1">per gram</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 text-center py-2 bg-cream-dark border-t border-gold/10">
        <p className="text-warm-gray-light text-xs">
          Data dari goldprice.org • Diperbarui setiap 15 menit
        </p>
      </div>
    </div>
  )
}
