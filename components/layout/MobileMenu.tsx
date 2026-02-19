'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Menu,
  Home,
  Gift,
  BookOpen,
  Shield,
  User,
  LogOut,
  Bell,
  MessageSquare,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'

interface MobileMenuProps {
  displayName: string
  email: string
}

const navItems = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Benefits', href: '/shop/online', icon: Gift },
  { label: 'Resources', href: '/hub', icon: BookOpen },
  { label: 'Safeguarding', href: '/support#safeguarding', icon: Shield },
]

export function MobileMenu({ displayName, email }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
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

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-[#F7F4EF] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-[#1C1C1C]" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        {/* User info header */}
        <div className="p-5 pb-4 flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-[#E7E2DA]">
            <AvatarFallback className="bg-[#117A65] text-white text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1C1C1C] truncate">
              {displayName}
            </p>
            <p className="text-xs text-[#6F6F6F] truncate">{email}</p>
          </div>
        </div>

        <Separator />

        {/* Quick actions */}
        <div className="flex gap-2 px-5 py-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#F7F4EF] text-[#4A4A4A] text-sm hover:bg-[#EDE8E0] transition-colors">
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#F7F4EF] text-[#4A4A4A] text-sm hover:bg-[#EDE8E0] transition-colors">
            <MessageSquare className="h-4 w-4" />
            Messages
          </button>
        </div>

        <Separator />

        {/* Nav items */}
        <nav className="flex flex-col py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#1C1C1C] hover:bg-[#F7F4EF] transition-colors"
              >
                <Icon className="h-[18px] w-[18px] text-[#6F6F6F]" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <Separator />

        {/* Profile & Logout */}
        <div className="flex flex-col py-2">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#1C1C1C] hover:bg-[#F7F4EF] transition-colors"
          >
            <User className="h-[18px] w-[18px] text-[#6F6F6F]" />
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#C94A4A] hover:bg-[#FEF2F2] transition-colors"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Log out
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
