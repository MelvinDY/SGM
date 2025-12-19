import { motion } from 'framer-motion'
import { useGoldPriceHistory } from '@/hooks/useGoldPrice'
import {
  formatIDR,
  formatUSD,
  calculateChange,
} from '@/services/goldPrice'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Clock,
  Calendar,
  Loader2,
  AlertCircle,
  Diamond,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

function PriceChangeIndicator({
  change,
  changePercent,
}: {
  change: number
  changePercent: number
}) {
  const isPositive = change > 0
  const isNegative = change < 0
  const isNeutral = change === 0

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-sm font-medium',
        isPositive && 'text-green-600',
        isNegative && 'text-red-600',
        isNeutral && 'text-warm-gray'
      )}
    >
      {isPositive && <TrendingUp className="w-4 h-4" />}
      {isNegative && <TrendingDown className="w-4 h-4" />}
      {isNeutral && <Minus className="w-4 h-4" />}
      <span>
        {isPositive && '+'}
        {formatIDR(change)} ({isPositive && '+'}
        {changePercent.toFixed(2)}%)
      </span>
    </div>
  )
}

function ComparisonCard({
  title,
  period,
  currentPrice,
  historicalPrice,
  icon: Icon,
}: {
  title: string
  period: string
  currentPrice: number
  historicalPrice: number | null
  icon: React.ElementType
}) {
  const { change, changePercent } = calculateChange(currentPrice, historicalPrice)

  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-gold/20 h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-warm-gray flex items-center gap-2">
              <Icon className="w-4 h-4 text-gold" />
              {title}
            </CardTitle>
            <span className="text-xs text-warm-gray">{period}</span>
          </div>
        </CardHeader>
        <CardContent>
          {historicalPrice ? (
            <>
              <p className="text-sm text-warm-gray mb-1">
                Harga saat itu: {formatIDR(historicalPrice)}
              </p>
              <PriceChangeIndicator change={change} changePercent={changePercent} />
            </>
          ) : (
            <p className="text-sm text-warm-gray">Data tidak tersedia</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function GoldPricePage() {
  const { data: priceHistory, isLoading, error, refetch, isFetching } = useGoldPriceHistory()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Update Harian
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-6">
              Harga <span className="text-gold font-cursive text-[1.15em]">Emas</span> Hari Ini
            </h1>
            <p className="text-warm-gray max-w-xl mx-auto text-elegant">
              Pantau harga emas terkini dan perbandingan dengan periode sebelumnya
              untuk membantu keputusan investasi Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="py-16 bg-cream-dark">
        <div className="container">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
          ) : error ? (
            <Card className="border-red-200 bg-red-50 max-w-lg mx-auto">
              <CardContent className="p-6 flex items-center gap-4 text-red-600">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-medium">Gagal memuat harga emas</p>
                  <p className="text-sm">Silakan coba lagi nanti</p>
                </div>
              </CardContent>
            </Card>
          ) : priceHistory ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Current Price Card */}
              <motion.div variants={fadeInUp}>
                <Card className="border-2 border-gold/30 bg-white max-w-2xl mx-auto overflow-hidden">
                  <div className="bg-gold p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Diamond className="w-5 h-5 text-white/80" />
                      <p className="text-white/80 text-sm uppercase tracking-wider">
                        Harga Emas per Gram
                      </p>
                      <Diamond className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="font-display text-5xl md:text-6xl text-white mb-2">
                      {formatIDR(priceHistory.today.price)}
                    </p>
                    <p className="text-white/80 text-sm">
                      {formatUSD(priceHistory.today.pricePerOunce)} / troy ounce
                    </p>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-warm-gray mb-1">
                          Perubahan hari ini
                        </p>
                        <PriceChangeIndicator
                          change={priceHistory.today.change}
                          changePercent={priceHistory.today.changePercent}
                        />
                      </div>
                      <div className="text-center sm:text-right text-sm text-warm-gray">
                        <div className="flex items-center justify-center sm:justify-end gap-1 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(priceHistory.today.timestamp)}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-end gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Update: {formatTime(priceHistory.today.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Refresh Button */}
              <motion.div variants={fadeInUp} className="text-center">
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="gap-2"
                >
                  <RefreshCw className={cn('w-4 h-4', isFetching && 'animate-spin')} />
                  {isFetching ? 'Memperbarui...' : 'Perbarui Harga'}
                </Button>
              </motion.div>

              {/* Historical Comparison */}
              <motion.div variants={fadeInUp}>
                <h2 className="font-display text-2xl text-charcoal text-center mb-6">
                  Perbandingan <span className="text-gold font-cursive text-[1.15em]">Historis</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ComparisonCard
                    title="Kemarin"
                    period="1 hari lalu"
                    currentPrice={priceHistory.today.price}
                    historicalPrice={priceHistory.yesterday?.price ?? null}
                    icon={Clock}
                  />
                  <ComparisonCard
                    title="Minggu Lalu"
                    period="7 hari lalu"
                    currentPrice={priceHistory.today.price}
                    historicalPrice={priceHistory.weekAgo?.price ?? null}
                    icon={Calendar}
                  />
                  <ComparisonCard
                    title="Bulan Lalu"
                    period="1 bulan lalu"
                    currentPrice={priceHistory.today.price}
                    historicalPrice={priceHistory.monthAgo?.price ?? null}
                    icon={Calendar}
                  />
                  <ComparisonCard
                    title="Tahun Lalu"
                    period="1 tahun lalu"
                    currentPrice={priceHistory.today.price}
                    historicalPrice={priceHistory.yearAgo?.price ?? null}
                    icon={Calendar}
                  />
                </div>
              </motion.div>

              {/* Karat Prices */}
              <motion.div variants={fadeInUp}>
                <h2 className="font-display text-2xl text-charcoal text-center mb-6">
                  Harga per <span className="text-gold font-cursive text-[1.15em]">Karat</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { karat: '24K', purity: 0.999, label: 'Emas Murni' },
                    { karat: '22K', purity: 0.916, label: 'Emas 916' },
                    { karat: '18K', purity: 0.75, label: 'Emas 750' },
                    { karat: '14K', purity: 0.585, label: 'Emas 585' },
                  ].map((item) => (
                    <Card key={item.karat} className="border-gold/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-display text-charcoal flex items-center justify-between">
                          <span>{item.karat}</span>
                          <span className="text-xs text-warm-gray font-normal">
                            {item.label}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-display text-2xl text-gold">
                          {formatIDR(Math.round(priceHistory.today.price * item.purity))}
                        </p>
                        <p className="text-xs text-warm-gray mt-1">per gram</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-cream">
        <div className="container max-w-3xl">
          <Card className="border-gold/20">
            <CardContent className="p-8">
              <h3 className="font-display text-xl text-charcoal mb-4">
                Tentang Harga Emas
              </h3>
              <div className="space-y-4 text-warm-gray text-elegant">
                <p>
                  Harga emas yang ditampilkan adalah harga acuan berdasarkan harga emas
                  internasional (XAU/USD) yang dikonversi ke Rupiah Indonesia.
                </p>
                <p>
                  Harga sebenarnya di toko dapat berbeda tergantung pada biaya pembuatan,
                  desain, dan faktor lainnya. Untuk harga pasti, silakan kunjungi toko kami
                  atau hubungi via WhatsApp.
                </p>
                <div className="pt-4 border-t border-gold/20">
                  <p className="text-xs text-warm-gray">
                    * Harga diperbarui setiap 5 menit dari sumber data pasar internasional.
                    <br />
                    * Konversi menggunakan kurs USD/IDR estimasi. Kurs aktual dapat berbeda.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
