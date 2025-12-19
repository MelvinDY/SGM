import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Loader2, Lock, Mail, ArrowLeft } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { signIn, user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin'

  // Redirect if already logged in as admin
  if (user && isAdmin) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError('Email atau password salah')
      setIsLoading(false)
    } else {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border-2 border-gold/20 p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <span className="block font-display text-lg text-charcoal">Toko Mas</span>
              <span className="block font-cursive text-3xl text-gold -mt-2">Sugema</span>
            </Link>
            <h1 className="font-display text-2xl text-charcoal">Admin Login</h1>
            <p className="text-warm-gray text-sm mt-2">
              Masuk untuk mengelola katalog produk
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-charcoal mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-cream border-2 border-gold/20 pl-10 pr-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                  placeholder="admin@tokomassugema.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-cream border-2 border-gold/20 pl-10 pr-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-warm-gray hover:text-gold transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
