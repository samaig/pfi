'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/client'

interface MobileMenuProps {
  displayName: string
  email: string
}

export function MobileMenu({ displayName, email }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    router.push('/login')
  }

  const navigate = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-[#F7F4EF] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-[#1C1C1C]" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="p-6 pb-4">
          <p className="text-sm font-semibold text-[#1C1C1C]">{displayName}</p>
          <p className="text-xs text-[#6F6F6F] truncate">{email}</p>
        </div>
        <Separator />
        <nav className="flex flex-col py-2">
          <button
            onClick={() => setExploreOpen(!exploreOpen)}
            className="flex items-center justify-between px-6 py-3 text-sm text-[#1C1C1C] hover:bg-[#F7F4EF] transition-colors"
          >
            <span>Explore Services</span>
            {exploreOpen ? (
              <ChevronDown className="h-4 w-4 text-[#6F6F6F]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[#6F6F6F]" />
            )}
          </button>
          {exploreOpen && (
            <div className="bg-[#F7F4EF]">
              <button
                onClick={() => navigate('/shop/online')}
                className="block w-full text-left px-10 py-2.5 text-sm text-[#1C1C1C] hover:text-[#117A65] transition-colors"
              >
                Shop Online
              </button>
              <button
                onClick={() => navigate('/shop/in-store')}
                className="block w-full text-left px-10 py-2.5 text-sm text-[#1C1C1C] hover:text-[#117A65] transition-colors"
              >
                Shop In-Person
              </button>
            </div>
          )}
          <button
            onClick={() => navigate('/hub')}
            className="flex items-center px-6 py-3 text-sm text-[#1C1C1C] hover:bg-[#F7F4EF] transition-colors"
          >
            Parents Hub
          </button>
          <Separator />
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center px-6 py-3 text-sm text-[#1C1C1C] hover:bg-[#F7F4EF] transition-colors"
          >
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-sm text-[#C94A4A] hover:bg-[#F7F4EF] transition-colors"
          >
            Log out
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
