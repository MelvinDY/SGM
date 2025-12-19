import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const lineVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: 1.5,
      },
    },
  }

  const cornerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 1,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,98,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Corner Ornaments */}
      <motion.div
        variants={cornerVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/30"
      />
      <motion.div
        variants={cornerVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/30"
      />
      <motion.div
        variants={cornerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold/30"
      />
      <motion.div
        variants={cornerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/30"
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container text-center"
      >
        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.4em] text-gold mb-8 font-body"
        >
          Est. 1990 — Karawang
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          variants={itemVariants}
          className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-8"
        />

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
        >
          Keindahan dalam
          <motion.span
            variants={itemVariants}
            className="block text-gold italic font-accent mt-2"
          >
            Setiap Detail
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-400 max-w-xl mx-auto mb-12 text-sm md:text-base leading-relaxed font-body"
        >
          Temukan koleksi perhiasan emas eksklusif dengan kualitas terbaik.
          Setiap karya dirancang untuk menemani momen berharga Anda.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/produk">
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(201, 169, 98, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-4 bg-gold text-black overflow-hidden transition-all duration-300 hover:bg-gold-light"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 font-accent text-lg tracking-widest uppercase font-semibold">
                Lihat Koleksi
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </Link>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{
                scale: 1.02,
                borderColor: '#C9A962',
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-4 bg-transparent border border-white/30 text-white overflow-hidden transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 font-accent text-lg tracking-widest uppercase font-semibold">
                <MessageCircle className="w-4 h-4" />
                Konsultasi
              </span>
            </motion.button>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Line Animation */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 origin-top"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold to-transparent" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="text-zinc-500 text-xs uppercase tracking-[0.3em]"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}
