"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer text-[#C94A4A] focus:text-[#C94A4A]"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
}
