import { Shield, Award, Heart, Target } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Integritas',
    description: 'Kejujuran dan transparansi dalam setiap transaksi adalah fondasi bisnis kami.',
  },
  {
    icon: Award,
    title: 'Kualitas',
    description: 'Hanya menyediakan perhiasan dengan standar kualitas tertinggi.',
  },
  {
    icon: Heart,
    title: 'Pelayanan',
    description: 'Memberikan pengalaman berbelanja yang nyaman dan memuaskan.',
  },
  {
    icon: Target,
    title: 'Kepercayaan',
    description: 'Membangun hubungan jangka panjang dengan pelanggan setia kami.',
  },
]

const milestones = [
  { year: '1990', title: 'Didirikan', description: 'Toko Mas Sugema pertama kali dibuka di Karawang.' },
  { year: '2000', title: 'Ekspansi', description: 'Memperluas koleksi dengan berbagai desain modern.' },
  { year: '2010', title: 'Renovasi', description: 'Memperbarui toko dengan konsep showroom modern.' },
  { year: '2020', title: 'Digital', description: 'Meluncurkan layanan konsultasi online via WhatsApp.' },
]

const team = [
  {
    name: 'Bapak Sugema',
    role: 'Pendiri',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Ibu Ratna',
    role: 'Manajer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    name: 'Mas Andi',
    role: 'Ahli Perhiasan',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
]

export function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Tentang Kami
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-6">
              Cerita <span className="text-gold italic font-accent">Kami</span>
            </h1>
            <p className="text-warm-gray max-w-xl mx-auto">
              Lebih dari tiga dekade melayani masyarakat Karawang dengan perhiasan
              emas berkualitas tinggi dan pelayanan terpercaya.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-cream-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80"
                  alt="Toko Mas Sugema"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold p-8 shadow-lg">
                <p className="font-display text-4xl text-white">30+</p>
                <p className="text-xs uppercase tracking-wider text-white/80">Tahun Melayani</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Sejak 1990
              </p>
              <h2 className="font-display text-4xl text-charcoal mb-6">
                Warisan Kepercayaan
                <span className="block text-gold italic font-accent">Turun-Temurun</span>
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  Toko Mas Sugema didirikan pada tahun 1990 oleh Bapak Sugema, seorang
                  pengrajin emas berpengalaman yang memiliki visi untuk menyediakan
                  perhiasan berkualitas tinggi bagi masyarakat Karawang.
                </p>
                <p>
                  Berawal dari toko kecil di Jalan Tuparev, kami terus berkembang menjadi
                  salah satu toko perhiasan emas terpercaya di Karawang. Keberhasilan ini
                  tidak lepas dari komitmen kami terhadap kualitas dan kepuasan pelanggan.
                </p>
                <p>
                  Kini, Toko Mas Sugema dikelola oleh generasi kedua yang tetap memegang
                  teguh nilai-nilai yang ditanamkan pendiri: kejujuran, kualitas, dan
                  pelayanan terbaik untuk setiap pelanggan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-cream border-y border-gold/20">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Nilai-Nilai Kami
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal">
              Prinsip yang <span className="text-gold italic font-accent">Kami Pegang</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 border-2 border-gold/20 bg-white shadow-sm hover:shadow-md hover:border-gold transition-all">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold/30 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-warm-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-cream-dark">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Perjalanan Kami
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal">
              Sejarah <span className="text-gold italic font-accent">Perkembangan</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gold flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="font-display text-lg text-white">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gold/30 mt-4" />
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="font-display text-xl text-charcoal mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-warm-gray">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Tim Kami
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal">
              Orang-Orang di <span className="text-gold italic font-accent">Balik Layar</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="aspect-square overflow-hidden mb-6 border-2 border-gold/20 shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gold">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-5xl text-white mb-2">30+</p>
              <p className="text-sm uppercase tracking-wider text-white/80">Tahun Pengalaman</p>
            </div>
            <div>
              <p className="font-display text-5xl text-white mb-2">5000+</p>
              <p className="text-sm uppercase tracking-wider text-white/80">Pelanggan Puas</p>
            </div>
            <div>
              <p className="font-display text-5xl text-white mb-2">1000+</p>
              <p className="text-sm uppercase tracking-wider text-white/80">Koleksi Tersedia</p>
            </div>
            <div>
              <p className="font-display text-5xl text-white mb-2">100%</p>
              <p className="text-sm uppercase tracking-wider text-white/80">Emas Asli</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
