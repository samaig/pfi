import { Heart, Users, Baby, Sparkles } from 'lucide-react'

interface HeroBannerProps {
  firstName: string | null
}

export function HeroBanner({ firstName }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#117A65] via-[#0e9177] to-[#0A2342]">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-8 py-10 md:px-12 md:py-14">
        {/* Left: Text content */}
        <div className="flex flex-col justify-center">
          <p className="text-[#A8E6CF] text-sm font-medium tracking-wide uppercase mb-2">
            Welcome back
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Hi {firstName || 'there'},
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/80 leading-relaxed max-w-md">
            Discover benefits, resources and support tailored to you and your
            family.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span>Personalised</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span>For families</span>
            </div>
          </div>
        </div>

        {/* Right: Illustration placeholder */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/5" />
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/5" />
            {/* Main illustration area */}
            <div className="relative h-[200px] w-[280px] rounded-2xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4 border border-white/10">
              <div className="flex gap-3">
                <div className="h-14 w-14 rounded-xl bg-[#E3A14F]/20 flex items-center justify-center">
                  <Baby className="h-7 w-7 text-[#E3A14F]" />
                </div>
                <div className="h-14 w-14 rounded-xl bg-[#A8E6CF]/20 flex items-center justify-center">
                  <Users className="h-7 w-7 text-[#A8E6CF]" />
                </div>
                <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium">
                Benefits that work for parents
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-white" />
        <div className="absolute bottom-10 right-32 w-24 h-24 rounded-full border border-white" />
        <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-white/20" />
      </div>
    </section>
  )
}
