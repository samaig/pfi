import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EF]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
