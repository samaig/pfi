import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
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
    <header className="sticky top-0 z-50 h-16 w-full bg-white border-b border-[#E7E2DA]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/home">
          <Logo />
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-[#1C1C1C] hover:text-[#117A65] transition-colors focus:outline-none">
                Explore Services
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <Link href="/shop/online" className="cursor-pointer">
                  Shop Online
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/shop/in-store" className="cursor-pointer">
                  Shop In-Person
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/hub"
            className="text-sm font-medium text-[#1C1C1C] hover:text-[#117A65] transition-colors"
          >
            Parents Hub
          </Link>
        </nav>

        {/* Right: Avatar + Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Desktop avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#117A65] focus:ring-offset-2">
                <Avatar className="h-8 w-8 border border-[#E7E2DA]">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                  <AvatarFallback className="bg-[#117A65] text-white text-xs font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-2">
                <p className="text-sm font-bold text-[#1C1C1C]">
                  {displayName}
                </p>
                <p className="text-xs text-[#6F6F6F] truncate">{email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  My Profile
                </Link>
              </DropdownMenuItem>
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
