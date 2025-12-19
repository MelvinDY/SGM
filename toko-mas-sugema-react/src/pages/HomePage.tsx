import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeroSection } from '@/components/HeroSection'
import { MessageCircle, Shield, Award, Gem, Star, MapPin, Phone, Clock, Diamond } from 'lucide-react'
import { useFeaturedProducts } from '@/hooks/useProducts'
import type { Product } from '@/types/database'

// Fallback featured products when Supabase is not configured
const fallbackFeaturedProducts: Product[] = [
  {
    id: '1',
    name: 'Cincin Berlian Solitaire',
    category: 'Cincin',
    weight: '3.5 gram',
    karat: '24K',
    price: null,
    description: null,
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    instagram_post_id: null,
    instagram_permalink: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Kalung Emas Italian',
    category: 'Kalung',
    weight: '8.2 gram',
    karat: '24K',
    price: null,
    description: null,
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    instagram_post_id: null,
    instagram_permalink: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Gelang Emas Ukir',
    category: 'Gelang',
    weight: '12.0 gram',
    karat: '24K',
    price: null,
    description: null,
    image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    instagram_post_id: null,
    instagram_permalink: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Anting Mutiara Premium',
    category: 'Anting',
    weight: '2.8 gram',
    karat: '22K',
    price: null,
    description: null,
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    instagram_post_id: null,
    instagram_permalink: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const features = [
  {
    icon: Shield,
    title: 'Keaslian Terjamin',
    description: 'Setiap perhiasan dilengkapi sertifikat keaslian resmi.',
  },
  {
    icon: Award,
    title: 'Pengalaman 30+ Tahun',
    description: 'Dipercaya masyarakat Karawang sejak tahun 1990.',
  },
  {
    icon: Gem,
    title: 'Kualitas Premium',
    description: 'Hanya menggunakan emas dengan kadar tertinggi.',
  },
]

const testimonials = [
  {
    name: 'Ibu Siti Aminah',
    role: 'Pelanggan Setia',
    content: 'Sudah berlangganan di Toko Mas Sugema sejak 20 tahun lalu. Kualitas emas selalu terjamin dan pelayanannya sangat ramah.',
  },
  {
    name: 'Bapak Hendra',
    role: 'Pengusaha',
    content: 'Tempat terbaik untuk investasi emas di Karawang. Harga kompetitif dan bisa dipercaya.',
  },
  {
    name: 'Ibu Dewi Lestari',
    role: 'Ibu Rumah Tangga',
    content: 'Koleksi perhiasannya sangat lengkap dan desainnya selalu mengikuti tren. Recommended!',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

export function HomePage() {
  const { data: supabaseFeatured } = useFeaturedProducts()

  // Use Supabase data if available, otherwise fallback to static data
  const featuredProducts = supabaseFeatured && supabaseFeatured.length > 0
    ? supabaseFeatured
    : fallbackFeaturedProducts

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Decorative Divider */}
      <div className="divider-gold">
        <Diamond className="divider-gold-icon" />
      </div>

      {/* About Preview Section */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs uppercase tracking-[0.3em] text-gold mb-4"
              >
                Tentang Kami
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl text-charcoal mb-6"
              >
                Warisan Kepercayaan
                <span className="block text-gold font-cursive text-5xl md:text-6xl mt-1">Sejak 1990</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-warm-gray text-elegant mb-6"
              >
                Toko Mas Sugema telah melayani masyarakat Karawang selama lebih dari tiga dekade.
                Kami berkomitmen menyediakan perhiasan emas dengan kualitas terbaik dan keaslian terjamin.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-warm-gray text-elegant mb-8"
              >
                Dengan pengalaman turun-temurun dalam industri perhiasan, kami memahami bahwa
                setiap perhiasan memiliki makna tersendiri bagi pemiliknya. Itulah mengapa kami
                selalu mengutamakan kualitas dan kepercayaan dalam setiap transaksi.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/tentang">
                  <Button variant="ghost" className="text-gold hover:text-gold/80 p-0">
                    Pelajari Lebih Lanjut →
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80"
                  alt="Toko Mas Sugema"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-gold p-8 shadow-lg"
              >
                <p className="font-display text-4xl text-white">30+</p>
                <p className="text-xs uppercase tracking-wider text-white/80">Tahun Pengalaman</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-cream-dark overflow-hidden">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.3em] text-gold mb-4"
            >
              Koleksi Unggulan
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl text-charcoal"
            >
              Perhiasan <span className="text-gold font-cursive text-[1.15em]">Pilihan</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <Card className="group card-classic overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-xs text-gold uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-display text-lg text-charcoal mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-warm-gray">
                      {product.weight}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/produk">
              <Button variant="outline" size="lg">
                Lihat Semua Koleksi
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-cream border-y border-gold/20 overflow-hidden">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: '#B8860B' }}
                  className="w-16 h-16 mx-auto mb-6 border-2 border-gold/30 flex items-center justify-center transition-colors"
                >
                  <feature.icon className="w-6 h-6 text-gold" />
                </motion.div>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-warm-gray">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-cream-dark overflow-hidden">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.3em] text-gold mb-4"
            >
              Testimoni
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl text-charcoal"
            >
              Apa Kata <span className="text-gold font-cursive text-[1.15em]">Pelanggan</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-classic p-8 h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-warm-gray text-elegant mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-display text-charcoal">{testimonial.name}</p>
                    <p className="text-xs text-warm-gray">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs uppercase tracking-[0.3em] text-gold mb-4"
              >
                Kunjungi Kami
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl text-charcoal mb-8"
              >
                Lokasi <span className="text-gold font-cursive text-[1.15em]">Toko</span>
              </motion.h2>

              <motion.div variants={staggerContainer} className="space-y-6">
                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-1">Alamat</h4>
                    <p className="text-elegant text-warm-gray">
                      Jl. Tuparev No. 123, Karawang Barat,<br />
                      Kabupaten Karawang, Jawa Barat 41311
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-1">Telepon</h4>
                    <p className="text-elegant text-warm-gray">
                      (0267) 123-4567<br />
                      +62 812-3456-7890
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-1">Jam Operasional</h4>
                    <p className="text-elegant text-warm-gray">
                      Senin - Sabtu: 09:00 - 21:00<br />
                      Minggu: 10:00 - 18:00
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat via WhatsApp
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square lg:aspect-auto bg-cream-dark shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2!2d107.3!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwN8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Toko Mas Sugema"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
