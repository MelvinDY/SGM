import { Link } from 'react-router-dom'
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Clock, Diamond } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-cream relative overflow-hidden">
      {/* Ornate Top Border */}
      <div className="relative py-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold" />
          <Diamond className="w-4 h-4 text-gold" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-16">
        {/* Center CTA */}
        <div className="text-center mb-16">
          <p className="font-cursive text-gold text-2xl mb-2">Perhiasan Berkualitas Tinggi</p>
          <h3 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
            Kunjungi Showroom Kami
          </h3>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-accent tracking-wide">Hubungi Kami</span>
          </a>
        </div>

        {/* Ornate Divider */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-gold/50" />
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          </div>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Links Grid with Ornate Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block mb-4">
              <span className="block font-display text-lg text-charcoal">Toko Mas</span>
              <span className="block font-cursive text-3xl text-gold -mt-2">Sugema</span>
            </Link>
            <div className="w-12 h-px bg-gold/50 mx-auto lg:mx-0 mb-4" />
            <p className="text-warm-gray font-accent leading-relaxed text-sm">
              Melayani masyarakat Karawang dengan perhiasan emas berkualitas sejak tahun 1990.
            </p>
          </div>

          {/* Menu */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-gold" />
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal font-medium">Menu</p>
              <div className="w-6 h-px bg-gold" />
            </div>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/produk', label: 'Produk' },
                { href: '/tentang', label: 'Tentang Kami' },
                { href: '/kontak', label: 'Kontak' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-warm-gray hover:text-gold transition-colors font-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-gold" />
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal font-medium">Kontak</p>
              <div className="w-6 h-px bg-gold" />
            </div>
            <ul className="space-y-4 text-warm-gray font-accent">
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Jl. Tuparev No. 123, Karawang</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>(0267) 123-4567</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <span>09:00 - 21:00 Setiap Hari</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-gold" />
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal font-medium">Sosial</p>
              <div className="w-6 h-px bg-gold" />
            </div>
            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: MessageCircle, href: 'https://wa.me/6281234567890' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-warm-gray font-accent italic">
              Ikuti kami untuk update terbaru
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Ornate Border */}
      <div className="relative py-6 border-t border-gold/20">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray tracking-wider">&copy; 2024 Toko Mas Sugema</p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-gold rotate-45" />
            <p className="text-xs text-warm-gray tracking-wider">Kepercayaan Sejak 1990</p>
            <div className="w-1 h-1 bg-gold rotate-45" />
          </div>
        </div>
      </div>

      {/* Large Brand Typography - 90% width */}
      <div className="relative h-24 md:h-32 lg:h-44 bg-cream-darker overflow-hidden">
        {/* Decorative top line */}
        <div className="absolute top-0 inset-x-0">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30" />

        {/* Large brand name - fills 90% width */}
        <div className="absolute inset-x-0 bottom-0 translate-y-[50%] flex justify-center">
          <p className="font-brand font-semibold text-[18vw] md:text-[16vw] lg:text-[14vw] leading-none text-gold/30 uppercase tracking-[0.15em] select-none pointer-events-none">
            Sugema
          </p>
        </div>

        {/* Center diamond */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <Diamond className="w-4 h-4 text-gold/40" />
        </div>
      </div>
    </footer>
  )
}
