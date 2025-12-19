import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircle, Shield, Award, Gem, Star, MapPin, Phone, Clock } from 'lucide-react'

const featuredProducts = [
  {
    id: 1,
    name: 'Cincin Berlian Solitaire',
    category: 'Cincin',
    weight: '3.5 gram',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Kalung Emas Italian',
    category: 'Kalung',
    weight: '8.2 gram',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Gelang Emas Ukir',
    category: 'Gelang',
    weight: '12.0 gram',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Anting Mutiara Premium',
    category: 'Anting',
    weight: '2.8 gram',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
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

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 container text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
            Est. 1990 — Karawang
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Keindahan dalam
            <span className="block text-gold italic font-accent">Setiap Detail</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Temukan koleksi perhiasan emas eksklusif dengan kualitas terbaik.
            Setiap karya dirancang untuk menemani momen berharga Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/produk">
              <Button size="lg">
                Lihat Koleksi
              </Button>
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Konsultasi
              </Button>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold to-transparent" />
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-black">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Tentang Kami
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Warisan Kepercayaan
                <span className="block text-gold italic font-accent">Sejak 1990</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Toko Mas Sugema telah melayani masyarakat Karawang selama lebih dari tiga dekade.
                Kami berkomitmen menyediakan perhiasan emas dengan kualitas terbaik dan keaslian terjamin.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Dengan pengalaman turun-temurun dalam industri perhiasan, kami memahami bahwa
                setiap perhiasan memiliki makna tersendiri bagi pemiliknya. Itulah mengapa kami
                selalu mengutamakan kualitas dan kepercayaan dalam setiap transaksi.
              </p>
              <Link to="/tentang">
                <Button variant="ghost" className="text-gold hover:text-gold/80 p-0">
                  Pelajari Lebih Lanjut →
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80"
                  alt="Toko Mas Sugema"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold p-8">
                <p className="font-display text-4xl text-black">30+</p>
                <p className="text-xs uppercase tracking-wider text-black/70">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Koleksi Unggulan
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Perhiasan <span className="text-gold italic font-accent">Pilihan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group bg-black border-zinc-800 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-xs text-gold uppercase tracking-wider mb-2">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {product.weight}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/produk">
              <Button variant="outline" size="lg">
                Lihat Semua Koleksi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black border-y border-zinc-900">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-gold flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Testimoni
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Apa Kata <span className="text-gold italic font-accent">Pelanggan</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black border-zinc-800 p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-display text-white">{testimonial.name}</p>
                  <p className="text-xs text-zinc-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Kunjungi Kami
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
                Lokasi <span className="text-gold italic font-accent">Toko</span>
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Alamat</h4>
                    <p className="text-sm text-zinc-500">
                      Jl. Tuparev No. 123, Karawang Barat,<br />
                      Kabupaten Karawang, Jawa Barat 41311
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Telepon</h4>
                    <p className="text-sm text-zinc-500">
                      (0267) 123-4567<br />
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Jam Operasional</h4>
                    <p className="text-sm text-zinc-500">
                      Senin - Sabtu: 09:00 - 21:00<br />
                      Minggu: 10:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
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
              </div>
            </div>

            <div className="aspect-square lg:aspect-auto bg-zinc-900">
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
