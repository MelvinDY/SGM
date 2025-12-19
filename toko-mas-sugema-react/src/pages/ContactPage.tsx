import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Clock, MessageCircle, Mail } from 'lucide-react'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Halo, saya ${formData.name}.\n\nSubjek: ${formData.subject}\n\n${formData.message}\n\nNomor HP: ${formData.phone}`
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Hubungi Kami
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-6">
              Mari <span className="text-gold italic font-accent">Berkomunikasi</span>
            </h1>
            <p className="text-warm-gray max-w-xl mx-auto">
              Kami siap membantu Anda menemukan perhiasan impian. Hubungi kami
              untuk konsultasi atau kunjungi toko kami langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-cream-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl text-charcoal mb-8">
                Kirim <span className="text-gold italic font-accent">Pesan</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-charcoal mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-charcoal mb-2">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-charcoal mb-2">
                    Subjek
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-gold/20 px-4 py-3 text-charcoal focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="Tanya Produk">Tanya Produk</option>
                    <option value="Konsultasi Perhiasan">Konsultasi Perhiasan</option>
                    <option value="Pemesanan Khusus">Pemesanan Khusus</option>
                    <option value="Layanan Perbaikan">Layanan Perbaikan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-charcoal mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tulis pesan Anda..."
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Kirim via WhatsApp
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl text-charcoal mb-8">
                Informasi <span className="text-gold italic font-accent">Kontak</span>
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-14 h-14 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-2">Alamat Toko</h4>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      Jl. Tuparev No. 123<br />
                      Karawang Barat, Kabupaten Karawang<br />
                      Jawa Barat 41311, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-2">Telepon</h4>
                    <p className="text-sm text-warm-gray">
                      <a href="tel:+622671234567" className="hover:text-gold transition-colors">
                        (0267) 123-4567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-2">WhatsApp</h4>
                    <p className="text-sm text-warm-gray">
                      <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold transition-colors"
                      >
                        +62 812-3456-7890
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-2">Email</h4>
                    <p className="text-sm text-warm-gray">
                      <a href="mailto:info@tokomassugema.com" className="hover:text-gold transition-colors">
                        info@tokomassugema.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-medium mb-2">Jam Operasional</h4>
                    <div className="text-sm text-warm-gray space-y-1">
                      <p>Senin - Sabtu: 09:00 - 21:00</p>
                      <p>Minggu: 10:00 - 18:00</p>
                      <p className="text-gold font-medium">Buka setiap hari!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Button */}
              <div className="mt-10 p-6 bg-white border-2 border-gold/20 shadow-sm">
                <p className="text-charcoal mb-4">Butuh respon cepat?</p>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat Langsung via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-cream">
        <div className="h-[500px] shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2!2d107.3!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwN8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Toko Mas Sugema"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold">
        <div className="container text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            Kunjungi Toko Kami
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Kami menantikan kedatangan Anda di Toko Mas Sugema.
            Tim kami siap membantu menemukan perhiasan sempurna untuk Anda.
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=-6.3,107.3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="gap-2 bg-white text-gold hover:bg-cream border-0">
              <MapPin className="w-4 h-4" />
              Petunjuk Arah
            </Button>
          </a>
        </div>
      </section>
    </>
  )
}
