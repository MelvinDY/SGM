import { Link } from 'react-router-dom'
import { useAllProducts } from '@/hooks/useProducts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Package,
  Star,
  Eye,
  EyeOff,
  Plus,
  Instagram,
  Loader2,
} from 'lucide-react'
import { CATEGORIES } from '@/types/database'

export function DashboardPage() {
  const { data: products, isLoading } = useAllProducts()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    )
  }

  const totalProducts = products?.length || 0
  const activeProducts = products?.filter((p) => p.is_active).length || 0
  const featuredProducts = products?.filter((p) => p.is_featured).length || 0
  const inactiveProducts = totalProducts - activeProducts

  const categoryStats = CATEGORIES.map((cat) => ({
    name: cat,
    count: products?.filter((p) => p.category === cat).length || 0,
  }))

  const recentProducts = products?.slice(0, 5) || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Dashboard</h1>
          <p className="text-warm-gray mt-1">Selamat datang di Admin Panel</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Produk
            </Button>
          </Link>
          <Link to="/admin/instagram">
            <Button variant="outline" className="gap-2">
              <Instagram className="w-4 h-4" />
              Sync Instagram
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-warm-gray">
              Total Produk
            </CardTitle>
            <Package className="w-4 h-4 text-gold" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-charcoal">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-warm-gray">
              Produk Aktif
            </CardTitle>
            <Eye className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-charcoal">{activeProducts}</p>
          </CardContent>
        </Card>

        <Card className="border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-warm-gray">
              Produk Unggulan
            </CardTitle>
            <Star className="w-4 h-4 text-gold" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-charcoal">{featuredProducts}</p>
          </CardContent>
        </Card>

        <Card className="border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-warm-gray">
              Produk Nonaktif
            </CardTitle>
            <EyeOff className="w-4 h-4 text-warm-gray" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-charcoal">{inactiveProducts}</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Stats & Recent Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Stats */}
        <Card className="border-gold/20">
          <CardHeader>
            <CardTitle className="font-display text-lg">Per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="text-charcoal">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-cream-dark overflow-hidden">
                      <div
                        className="h-full bg-gold"
                        style={{
                          width: `${totalProducts > 0 ? (cat.count / totalProducts) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-warm-gray w-8 text-right">
                      {cat.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card className="border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">Produk Terbaru</CardTitle>
            <Link to="/admin/products">
              <Button variant="ghost" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-charcoal font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-warm-gray">
                        {product.category} • {product.weight}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.is_featured && (
                        <Star className="w-4 h-4 text-gold fill-gold" />
                      )}
                      {product.is_active ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-warm-gray" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-warm-gray py-8">
                Belum ada produk. Tambah produk pertama Anda!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
