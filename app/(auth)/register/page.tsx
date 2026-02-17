"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterPage() {
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
  const [logoError, setLogoError] = useState(false);
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
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left half - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#117A65] items-center justify-center">
        {!leftLogoError ? (
          <Image
            src="/logo.png"
            alt="Parentfits"
            fill
            className="object-cover"
            onError={() => setLeftLogoError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-white">
            <h1 className="text-5xl font-bold tracking-tight">Parentfits</h1>
            <p className="text-lg opacity-90">
              Benefits that work for parents
            </p>
          </div>
        )}
      </div>

      {/* Right half - register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <div className="mb-8">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Parentfits"
                width={80}
                height={32}
                className="h-8 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-[#117A65]">
                Parentfits
              </span>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-[32px] font-semibold text-[#1C1C1C] leading-tight">
            Create Account
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-2 mb-8">
            Set up your Parentfits account
          </p>

          {success ? (
            <div className="rounded-xl border border-[#3A9D7A] bg-[#3A9D7A]/10 p-4">
              <p className="text-sm text-[#3A9D7A] font-medium">
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
              {/* Email/Password form */}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#1C1C1C]">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="h-[44px] rounded-xl border-[#E7E2DA] focus-visible:ring-[#117A65]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#1C1C1C]">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="h-[44px] rounded-xl border-[#E7E2DA] focus-visible:ring-[#117A65]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1C1C1C]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-[44px] rounded-xl border-[#E7E2DA] focus-visible:ring-[#117A65]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1C1C1C]">
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
                      className="h-[44px] rounded-xl border-[#E7E2DA] pr-10 focus-visible:ring-[#117A65]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F6F] hover:text-[#1C1C1C]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#1C1C1C]">
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
                      className="h-[44px] rounded-xl border-[#E7E2DA] pr-10 focus-visible:ring-[#117A65]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F6F] hover:text-[#1C1C1C]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[44px] rounded-xl bg-[#117A65] hover:bg-[#0e6554] text-white font-medium cursor-pointer"
                >
                  {loading && (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  )}
                  Create Account
                </Button>

                {error && (
                  <p className="text-sm text-[#C94A4A] mt-2">{error}</p>
                )}
              </form>

              {/* Links */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#6F6F6F]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#117A65] font-medium hover:underline"
                  >
                    Log In
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E7E2DA]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-[#6F6F6F]">Or</span>
                </div>
              </div>

              {/* OAuth buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-[44px] rounded-xl border-[#E7E2DA] text-[#1C1C1C] font-medium cursor-pointer"
                  onClick={() => handleOAuthSignIn("azure")}
                >
                  <svg
                    className="mr-2 h-5 w-5 shrink-0"
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
                  className="w-full h-[44px] rounded-xl border-[#E7E2DA] text-[#1C1C1C] font-medium cursor-pointer"
                  onClick={() => handleOAuthSignIn("google")}
                >
                  <svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
