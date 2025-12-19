import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = ['Semua', 'Cincin', 'Kalung', 'Gelang', 'Anting']

const products = [
  {
    id: 1,
    name: 'Cincin Berlian Solitaire',
    category: 'Cincin',
    weight: '3.5 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Cincin Emas Ukir Tradisional',
    category: 'Cincin',
    weight: '4.2 gram',
    karat: '22K',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Cincin Couple Premium',
    category: 'Cincin',
    weight: '5.0 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Kalung Emas Italian',
    category: 'Kalung',
    weight: '8.2 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Kalung Liontin Berlian',
    category: 'Kalung',
    weight: '6.5 gram',
    karat: '22K',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Kalung Emas Rantai',
    category: 'Kalung',
    weight: '10.0 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Gelang Emas Ukir',
    category: 'Gelang',
    weight: '12.0 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Gelang Emas Minimalis',
    category: 'Gelang',
    weight: '5.5 gram',
    karat: '22K',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
  },
  {
    id: 9,
    name: 'Gelang Berlian Premium',
    category: 'Gelang',
    weight: '15.0 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop',
  },
  {
    id: 10,
    name: 'Anting Mutiara Premium',
    category: 'Anting',
    weight: '2.8 gram',
    karat: '22K',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
  },
  {
    id: 11,
    name: 'Anting Emas Tindik',
    category: 'Anting',
    weight: '1.5 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&h=400&fit=crop',
  },
  {
    id: 12,
    name: 'Anting Berlian Mewah',
    category: 'Anting',
    weight: '3.2 gram',
    karat: '24K',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop',
  },
]

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filteredProducts = activeCategory === 'Semua'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Koleksi Kami
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-6">
              Katalog <span className="text-gold font-cursive text-[1.15em]">Perhiasan</span>
            </h1>
            <p className="text-warm-gray max-w-xl mx-auto">
              Jelajahi koleksi lengkap perhiasan emas kami dengan berbagai pilihan desain
              dan kadar emas premium.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-cream-dark">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-6 py-3 text-xs uppercase tracking-[0.2em] border-2 transition-all',
                  activeCategory === category
                    ? 'bg-gold border-gold text-white'
                    : 'border-gold/30 text-charcoal hover:border-gold hover:text-gold'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group card-classic overflow-hidden">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Tanya Produk
                      </Button>
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-xs text-gold uppercase tracking-wider mb-2">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-charcoal mb-3">
                    {product.name}
                  </h3>
                  <div className="flex justify-between text-sm text-warm-gray">
                    <span>{product.weight}</span>
                    <span className="text-gold font-medium">{product.karat}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-12 border-2 border-gold/30 bg-cream">
            <h3 className="font-display text-2xl text-charcoal mb-4">
              Tidak menemukan yang Anda cari?
            </h3>
            <p className="text-warm-gray mb-6 max-w-lg mx-auto">
              Hubungi kami untuk pemesanan khusus atau konsultasi mengenai perhiasan impian Anda.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
