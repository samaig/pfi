import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/logout-button";
import { Logo } from "@/components/logo";
import { User } from "lucide-react";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Navigation bar */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Logo />

            {/* Right: Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#117A65] focus:ring-offset-2">
                  <Avatar className="h-9 w-9 border border-[#E7E2DA]">
                    <AvatarFallback className="bg-[#117A65] text-white text-sm font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium text-[#1C1C1C]">
                    {fullName}
                  </p>
                  <p className="text-xs text-[#6F6F6F] truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <LogoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-4 py-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#117A65]/10 mb-4">
            <User className="w-8 h-8 text-[#117A65]" />
          </div>
          <h1 className="text-[32px] font-semibold text-[#1C1C1C]">
            Welcome to Parentfits
          </h1>
          <p className="text-[#6F6F6F]">
            Signed in as{" "}
            <span className="font-medium text-[#1C1C1C]">{user.email}</span>
          </p>
          <p className="text-sm text-[#6F6F6F]">Onboarding coming soon</p>
        </div>
      </main>
    </div>
  );
}
