import { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProduct, useCreateProduct, useUpdateProduct } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { CATEGORIES } from '@/types/database'
import type { ProductCategory } from '@/types/database'

const productSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi'),
  category: z.enum(['Cincin', 'Kalung', 'Gelang', 'Anting'] as const),
  weight: z.string().min(1, 'Berat wajib diisi'),
  karat: z.string().min(1, 'Karat wajib diisi'),
  price: z.number().nullable(),
  description: z.string().nullable(),
  image_url: z.string().url('URL gambar tidak valid').min(1, 'URL gambar wajib diisi'),
  is_featured: z.boolean(),
  is_active: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

export function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const { data: product, isLoading: isLoadingProduct } = useProduct(id || '')
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: 'Cincin',
      weight: '',
      karat: '24K',
      price: null,
      description: null,
      image_url: '',
      is_featured: false,
      is_active: true,
    },
  })

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category as ProductCategory,
        weight: product.weight,
        karat: product.karat,
        price: product.price,
        description: product.description,
        image_url: product.image_url,
        is_featured: product.is_featured,
        is_active: product.is_active,
      })
    }
  }, [product, reset])

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEdit && id) {
        await updateProduct.mutateAsync({ id, updates: data })
      } else {
        await createProduct.mutateAsync({
          ...data,
          instagram_post_id: null,
          instagram_permalink: null,
        })
      }
      navigate('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const imageUrl = watch('image_url')

  if (isEdit && isLoadingProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl text-charcoal">
            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
          </h1>
          <p className="text-warm-gray mt-1">
            {isEdit ? 'Perbarui informasi produk' : 'Tambah produk baru ke katalog'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="font-display text-lg">Informasi Produk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm text-charcoal mb-2">
                    Nama Produk *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                    placeholder="Cincin Berlian Solitaire"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-charcoal mb-2">
                      Kategori *
                    </label>
                    <select
                      {...register('category')}
                      className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal focus:border-gold focus:outline-none transition-colors"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-charcoal mb-2">
                      Karat *
                    </label>
                    <select
                      {...register('karat')}
                      className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="24K">24K</option>
                      <option value="22K">22K</option>
                      <option value="18K">18K</option>
                      <option value="14K">14K</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-charcoal mb-2">Berat *</label>
                    <input
                      {...register('weight')}
                      className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                      placeholder="3.5 gram"
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-charcoal mb-2">
                      Harga (opsional)
                    </label>
                    <input
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                      placeholder="5000000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-charcoal mb-2">
                    URL Gambar *
                  </label>
                  <input
                    {...register('image_url')}
                    className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.image_url && (
                    <p className="text-red-500 text-sm mt-1">{errors.image_url.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-charcoal mb-2">
                    Deskripsi (opsional)
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full bg-cream border-2 border-gold/20 px-4 py-3 text-charcoal placeholder-warm-gray focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Deskripsi produk..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="font-display text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/400?text=Image+Error'
                    }}
                  />
                ) : (
                  <div className="w-full aspect-square bg-cream-dark flex items-center justify-center text-warm-gray">
                    Belum ada gambar
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="font-display text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('is_active')}
                    className="w-5 h-5 accent-gold"
                  />
                  <span className="text-charcoal">Aktif (tampil di website)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('is_featured')}
                    className="w-5 h-5 accent-gold"
                  />
                  <span className="text-charcoal">Produk Unggulan</span>
                </label>
              </CardContent>
            </Card>

            {/* Actions */}
            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
