import Link from 'next/link'
import { Bell, MessageSquare, User, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HeaderLogout } from './HeaderLogout'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Benefits', href: '/shop/online' },
  { label: 'Resources', href: '/hub' },
  { label: 'Safeguarding', href: '/support#safeguarding' },
]

export async function Header() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: {
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
    email: string | null
  } | null = null

  if (user) {
    const { data } = await supabase
      .from('users')
      .select('first_name, last_name, avatar_url, email')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const firstName = profile?.first_name || ''
  const lastName = profile?.last_name || ''
  const email = profile?.email || user?.email || ''
  const avatarUrl = profile?.avatar_url || null

  const displayName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName || email.split('@')[0] || 'User'

  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : email
        ? email.slice(0, 2).toUpperCase()
        : 'U'

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E7E2DA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/home" className="shrink-0">
          <Logo />
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-[#4A4A4A] hover:text-[#117A65] hover:bg-[#F7F4EF] rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions + Avatar + Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-full text-[#6F6F6F] hover:text-[#117A65] hover:bg-[#F7F4EF] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#E3A14F] ring-2 ring-white" />
          </button>

          {/* Messages */}
          <button
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-full text-[#6F6F6F] hover:text-[#117A65] hover:bg-[#F7F4EF] transition-colors"
            aria-label="Messages"
          >
            <MessageSquare className="h-[18px] w-[18px]" />
          </button>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-[#E7E2DA] mx-1" />

          {/* Desktop avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-[#F7F4EF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#117A65] focus:ring-offset-2">
                <Avatar className="h-8 w-8 border border-[#E7E2DA]">
                  {avatarUrl && (
                    <AvatarImage src={avatarUrl} alt={displayName} />
                  )}
                  <AvatarFallback className="bg-[#117A65] text-white text-xs font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3.5 w-3.5 text-[#6F6F6F]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  {displayName}
                </p>
                <p className="text-xs text-[#6F6F6F] truncate">{email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <HeaderLogout />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <MobileMenu displayName={displayName} email={email} />
        </div>
      </div>
    </header>
  )
}
