import { useState } from 'react'
import { useCreateProduct } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Instagram,
  RefreshCw,
  Check,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMockInstagramPosts } from '@/services/instagram'
import type { ParsedInstagramPost } from '@/services/instagram'
import { CATEGORIES } from '@/types/database'
import type { ProductCategory } from '@/types/database'

export function InstagramSyncPage() {
  const [posts, setPosts] = useState<ParsedInstagramPost[]>([])
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successCount, setSuccessCount] = useState(0)

  const createProduct = useCreateProduct()

  const fetchPosts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // For demo, use mock data. In production, uncomment the real API call:
      // const rawPosts = await fetchInstagramPosts()
      // const parsedPosts = parseInstagramPosts(rawPosts)

      // Using mock data for demo
      const parsedPosts = getMockInstagramPosts()
      setPosts(parsedPosts)
    } catch (err) {
      setError('Gagal mengambil data dari Instagram. Pastikan token akses valid.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePostSelection = (postId: string) => {
    setSelectedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const selectAll = () => {
    setSelectedPosts(new Set(posts.map((p) => p.id)))
  }

  const deselectAll = () => {
    setSelectedPosts(new Set())
  }

  const updatePostCategory = (postId: string, category: ProductCategory) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, detectedCategory: category } : p))
    )
  }

  const updatePostName = (postId: string, name: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, suggestedName: name } : p))
    )
  }

  const importSelectedPosts = async () => {
    setIsSyncing(true)
    setSuccessCount(0)

    const postsToImport = posts.filter((p) => selectedPosts.has(p.id))
    let imported = 0

    for (const post of postsToImport) {
      if (!post.detectedCategory) continue

      try {
        await createProduct.mutateAsync({
          name: post.suggestedName,
          category: post.detectedCategory,
          weight: '0 gram', // Default, admin can edit later
          karat: '24K',
          price: null,
          description: post.caption,
          image_url: post.media_url,
          instagram_post_id: post.id,
          instagram_permalink: post.permalink,
          is_featured: false,
          is_active: true,
        })
        imported++
        setSuccessCount(imported)
      } catch (err) {
        console.error(`Failed to import post ${post.id}:`, err)
      }
    }

    setIsSyncing(false)
    setSelectedPosts(new Set())

    // Refresh posts list
    if (imported > 0) {
      fetchPosts()
    }
  }

  const postsWithCategory = posts.filter((p) => p.detectedCategory)
  const selectedCount = selectedPosts.size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Instagram Sync</h1>
          <p className="text-warm-gray mt-1">
            Import produk dari postingan Instagram
          </p>
        </div>
        <Button onClick={fetchPosts} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {isLoading ? 'Memuat...' : 'Ambil Postingan'}
        </Button>
      </div>

      {/* Info Card */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Instagram className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="text-sm text-charcoal">
              <p className="font-medium mb-1">Cara Kerja:</p>
              <ol className="list-decimal list-inside space-y-1 text-warm-gray">
                <li>Klik "Ambil Postingan" untuk mengambil postingan terbaru dari Instagram</li>
                <li>Sistem akan mendeteksi kategori berdasarkan hashtag (#cincin, #kalung, #gelang, #anting)</li>
                <li>Pilih postingan yang ingin diimport dan sesuaikan nama jika perlu</li>
                <li>Klik "Import" untuk menambahkan ke katalog produk</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Success */}
      {successCount > 0 && !isSyncing && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3 text-green-600">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p>Berhasil mengimport {successCount} produk!</p>
          </CardContent>
        </Card>
      )}

      {/* Posts Grid */}
      {posts.length > 0 && (
        <>
          {/* Selection Controls */}
          <Card className="border-gold/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-charcoal">
                    {selectedCount} dari {postsWithCategory.length} postingan dipilih
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={selectAll}>
                      Pilih Semua
                    </Button>
                    <Button variant="ghost" size="sm" onClick={deselectAll}>
                      Batal Pilih
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={importSelectedPosts}
                  disabled={selectedCount === 0 || isSyncing}
                  className="gap-2"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengimport ({successCount})...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Import ({selectedCount})
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className={cn(
                  'border-2 transition-colors cursor-pointer',
                  selectedPosts.has(post.id)
                    ? 'border-gold bg-gold/5'
                    : 'border-gold/20 hover:border-gold/40'
                )}
                onClick={() => post.detectedCategory && togglePostSelection(post.id)}
              >
                <div className="relative aspect-square">
                  <img
                    src={post.media_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {selectedPosts.has(post.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-gold flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {!post.detectedCategory && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <X className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Tidak ada kategori terdeteksi</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 space-y-3">
                  {/* Name Input */}
                  <input
                    type="text"
                    value={post.suggestedName}
                    onChange={(e) => updatePostName(post.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-cream border border-gold/20 px-3 py-2 text-sm text-charcoal focus:border-gold focus:outline-none"
                    placeholder="Nama produk"
                  />

                  {/* Category Select */}
                  <select
                    value={post.detectedCategory || ''}
                    onChange={(e) =>
                      updatePostCategory(post.id, e.target.value as ProductCategory)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      'w-full bg-cream border border-gold/20 px-3 py-2 text-sm focus:border-gold focus:outline-none',
                      post.detectedCategory ? 'text-charcoal' : 'text-warm-gray'
                    )}
                  >
                    <option value="">Pilih kategori</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  {/* Caption Preview */}
                  <p className="text-xs text-warm-gray line-clamp-2">
                    {post.caption}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!isLoading && posts.length === 0 && (
        <Card className="border-gold/20">
          <CardContent className="py-16 text-center">
            <Instagram className="w-12 h-12 text-warm-gray mx-auto mb-4" />
            <h3 className="font-display text-xl text-charcoal mb-2">
              Belum Ada Postingan
            </h3>
            <p className="text-warm-gray mb-6">
              Klik tombol "Ambil Postingan" untuk mengambil postingan dari Instagram
            </p>
            <Button onClick={fetchPosts} disabled={isLoading} className="gap-2">
              <Instagram className="w-4 h-4" />
              Ambil Postingan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
