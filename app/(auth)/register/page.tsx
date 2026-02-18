"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(searchParams.get("error") ?? "");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leftLogoError, setLeftLogoError] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "azure") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        ...(provider === "azure" && { scopes: "openid email profile" }),
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left half - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-gradient-to-br from-[#117A65] via-[#0e6354] to-[#0A2342]">
        {!leftLogoError ? (
          <Image
            src="/logo.png"
            alt="Parentfits"
            fill
            className="object-cover"
            onError={() => setLeftLogoError(true)}
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-6 text-white px-12 text-center">
            {/* Decorative circles */}
            <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute top-1/4 right-12 w-20 h-20 rounded-full bg-white/[0.03]" />

            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl font-bold">P</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Parentfits</h1>
            <p className="text-lg text-white/80 max-w-[320px] leading-relaxed">
              Your dedicated support hub with everything you need as a parent, in one place.
            </p>
            <div className="flex gap-2 mt-4">
              <div className="w-8 h-1 rounded-full bg-white/25" />
              <div className="w-8 h-1 rounded-full bg-white/60" />
              <div className="w-8 h-1 rounded-full bg-white/25" />
            </div>
          </div>
        )}
      </div>

      {/* Right half - register form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        {/* Top bar with logo */}
        <div className="px-8 pt-8">
          <Link href="/" className="inline-block">
            <span className="text-xl font-bold text-[#117A65]">Parentfits</span>
          </Link>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8">
          <div className="w-full max-w-[400px]">
            {/* Heading */}
            <h1 className="text-[28px] font-semibold text-[#1C1C1C] leading-tight">
              Create your account
            </h1>
            <p className="text-sm text-[#6F6F6F] mt-1.5 mb-7">
              Set up your Parentfits account to get started
            </p>

            {success ? (
              <div className="rounded-xl border border-[#3A9D7A]/30 bg-[#3A9D7A]/5 p-5">
                <p className="text-sm text-[#117A65] font-medium">
                  Check your email to confirm your account
                </p>
                <p className="text-sm text-[#6F6F6F] mt-2">
                  We&apos;ve sent a confirmation link to{" "}
                  <span className="font-medium text-[#1C1C1C]">{email}</span>.
                </p>
                <Link
                  href="/login"
                  className="inline-block mt-4 text-sm text-[#117A65] font-medium hover:underline"
                >
                  Back to Log In
                </Link>
              </div>
            ) : (
              <>
                {/* OAuth buttons */}
                <div className="space-y-2.5 mb-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-[46px] rounded-xl border-[#E7E2DA] text-[#1C1C1C] font-medium cursor-pointer hover:bg-[#F7F4EF] transition-colors"
                    onClick={() => handleOAuthSignIn("azure")}
                  >
                    <svg
                      className="mr-2.5 h-5 w-5 shrink-0"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                    </svg>
                    Continue with Microsoft
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-[46px] rounded-xl border-[#E7E2DA] text-[#1C1C1C] font-medium cursor-pointer hover:bg-[#F7F4EF] transition-colors"
                    onClick={() => handleOAuthSignIn("google")}
                  >
                    <svg className="mr-2.5 h-5 w-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E7E2DA]" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-[#9C9C9C] uppercase tracking-wide">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password form */}
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-sm text-[#1C1C1C] font-medium">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-[46px] rounded-xl border-[#E7E2DA] focus-visible:ring-[#117A65] bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-sm text-[#1C1C1C] font-medium">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-[46px] rounded-xl border-[#E7E2DA] focus-visible:ring-[#117A65] bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm text-[#1C1C1C] font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-[46px] rounded-xl border-[#E7E2DA] focus-visible:ring-[#117A65] bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm text-[#1C1C1C] font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-[46px] rounded-xl border-[#E7E2DA] pr-10 focus-visible:ring-[#117A65] bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C9C9C] hover:text-[#6F6F6F] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="text-sm text-[#1C1C1C] font-medium">
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="h-[46px] rounded-xl border-[#E7E2DA] pr-10 focus-visible:ring-[#117A65] bg-white"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C9C9C] hover:text-[#6F6F6F] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg bg-[#C94A4A]/10 border border-[#C94A4A]/20 px-3 py-2.5">
                      <p className="text-sm text-[#C94A4A]">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[46px] rounded-xl bg-[#117A65] hover:bg-[#0e6554] text-white font-medium cursor-pointer transition-colors"
                  >
                    {loading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Create Account
                  </Button>
                </form>

                {/* Login link */}
                <p className="mt-6 text-center text-sm text-[#6F6F6F]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#117A65] font-medium hover:underline"
                  >
                    Log In
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="px-8 pb-6">
          <p className="text-xs text-[#9C9C9C] text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
