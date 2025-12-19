import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useAllProducts,
  useDeleteProduct,
  useToggleProductActive,
  useToggleProductFeatured,
} from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Loader2,
  Instagram,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/types/database'
import type { ProductCategory } from '@/types/database'

export function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all')

  const { data: products, isLoading } = useAllProducts()
  const deleteProduct = useDeleteProduct()
  const toggleActive = useToggleProductActive()
  const toggleFeatured = useToggleProductFeatured()

  const filteredProducts = products?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${name}"?`)) {
      await deleteProduct.mutateAsync(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Produk</h1>
          <p className="text-warm-gray mt-1">
            {products?.length || 0} produk terdaftar
          </p>
        </div>
        <Link to="/admin/products/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-gold/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk..."
                className="w-full bg-cream border-2 border-gold/20 pl-10 pr-4 py-2 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCategoryFilter('all')}
                className={cn(
                  'px-4 py-2 text-sm border-2 transition-colors',
                  categoryFilter === 'all'
                    ? 'bg-gold border-gold text-white'
                    : 'border-gold/30 text-charcoal hover:border-gold'
                )}
              >
                Semua
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'px-4 py-2 text-sm border-2 transition-colors',
                    categoryFilter === cat
                      ? 'bg-gold border-gold text-white'
                      : 'border-gold/30 text-charcoal hover:border-gold'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-gold/20">
        <CardHeader>
          <CardTitle className="font-display text-lg">Daftar Produk</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left p-3 text-sm text-warm-gray font-medium">
                      Produk
                    </th>
                    <th className="text-left p-3 text-sm text-warm-gray font-medium">
                      Kategori
                    </th>
                    <th className="text-left p-3 text-sm text-warm-gray font-medium">
                      Berat
                    </th>
                    <th className="text-left p-3 text-sm text-warm-gray font-medium">
                      Karat
                    </th>
                    <th className="text-center p-3 text-sm text-warm-gray font-medium">
                      Status
                    </th>
                    <th className="text-right p-3 text-sm text-warm-gray font-medium">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gold/10 hover:bg-cream-dark/50"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-12 h-12 object-cover"
                          />
                          <div>
                            <p className="text-charcoal font-medium">
                              {product.name}
                            </p>
                            {product.instagram_post_id && (
                              <div className="flex items-center gap-1 text-xs text-warm-gray">
                                <Instagram className="w-3 h-3" />
                                <span>Dari Instagram</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-charcoal">{product.category}</td>
                      <td className="p-3 text-charcoal">{product.weight}</td>
                      <td className="p-3 text-gold font-medium">{product.karat}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              toggleFeatured.mutate({
                                id: product.id,
                                isFeatured: !product.is_featured,
                              })
                            }
                            className={cn(
                              'p-1.5 rounded transition-colors',
                              product.is_featured
                                ? 'text-gold bg-gold/10'
                                : 'text-warm-gray hover:text-gold'
                            )}
                            title={product.is_featured ? 'Hapus dari unggulan' : 'Jadikan unggulan'}
                          >
                            <Star
                              className={cn(
                                'w-4 h-4',
                                product.is_featured && 'fill-gold'
                              )}
                            />
                          </button>
                          <button
                            onClick={() =>
                              toggleActive.mutate({
                                id: product.id,
                                isActive: !product.is_active,
                              })
                            }
                            className={cn(
                              'p-1.5 rounded transition-colors',
                              product.is_active
                                ? 'text-green-600 bg-green-50'
                                : 'text-warm-gray hover:text-green-600'
                            )}
                            title={product.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                          >
                            {product.is_active ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={deleteProduct.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-warm-gray mb-4">
                {search || categoryFilter !== 'all'
                  ? 'Tidak ada produk yang sesuai filter'
                  : 'Belum ada produk'}
              </p>
              {!search && categoryFilter === 'all' && (
                <Link to="/admin/products/new">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Produk Pertama
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
