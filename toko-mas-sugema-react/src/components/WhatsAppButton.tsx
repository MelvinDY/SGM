import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold flex items-center justify-center hover:bg-white transition-all group"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-black" />
      <span className="absolute right-16 bg-white text-black text-xs font-medium px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat dengan Kami
      </span>
    </a>
  )
}
