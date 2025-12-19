import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'

interface LayoutProps {
  children: React.ReactNode
  hideFooter?: boolean
  hideNavbar?: boolean
  hideWhatsApp?: boolean
}

export function Layout({ children, hideFooter = false, hideNavbar = false, hideWhatsApp = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
      {!hideWhatsApp && <WhatsAppButton />}
    </div>
  )
}
