import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { ProductsPage } from '@/pages/ProductsPage'
import { GoldPricePage } from '@/pages/GoldPricePage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'

// Admin pages
import { LoginPage } from '@/pages/admin/LoginPage'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage'
import { ProductFormPage } from '@/pages/admin/ProductFormPage'
import { InstagramSyncPage } from '@/pages/admin/InstagramSyncPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<Layout><HomePage /></Layout>} path="/" />
        <Route element={<Layout><ProductsPage /></Layout>} path="/produk" />
        <Route element={<Layout><GoldPricePage /></Layout>} path="/harga-emas" />
        <Route element={<Layout><AboutPage /></Layout>} path="/tentang" />
        <Route element={<Layout><ContactPage /></Layout>} path="/kontak" />

        {/* Admin routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/:id/edit" element={<ProductFormPage />} />
          <Route path="instagram" element={<InstagramSyncPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
