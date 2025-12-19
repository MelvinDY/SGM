import { Link } from 'react-router-dom'
import { Facebook, Instagram, MessageCircle, Diamond, MapPin, Phone } from 'lucide-react'

const menuLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/produk', label: 'Produk' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/kontak', label: 'Kontak' },
]

const categoryLinks = [
  { href: '/produk', label: 'Cincin Emas' },
  { href: '/produk', label: 'Kalung Emas' },
  { href: '/produk', label: 'Gelang Emas' },
  { href: '/produk', label: 'Anting Emas' },
]

export function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-gold/20">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="block mb-6">
              <span className="block font-display text-lg tracking-wide text-charcoal">
                Toko Mas
              </span>
              <span className="block font-accent text-xl italic text-gold">
                Sugema
              </span>
            </Link>
            <p className="text-elegant text-warm-gray mb-6">
              Pusat perhiasan emas berkualitas tinggi di Karawang.
              Melayani dengan kepercayaan sejak 1990.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal mb-6">
              Menu
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-warm-gray hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal mb-6">
              Kategori
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-warm-gray hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal mb-6">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-warm-gray">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Jl. Tuparev No. 123, Karawang</span>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>(0267) 123-4567</span>
              </li>
              <li className="flex gap-3 items-start">
                <MessageCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/20 py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray tracking-wider">
            &copy; 2024 Toko Mas Sugema. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-2 text-gold">
            <Diamond className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  )
}
