import { ExternalLink, ShieldCheck, Globe, Phone, Stethoscope } from 'lucide-react'

const resources = [
  {
    id: 1,
    name: 'NHS Start for Life',
    description:
      'Trusted NHS guidance on pregnancy, birth, and early parenthood — from feeding to mental health support.',
    icon: Stethoscope,
    color: '#117A65',
    bgColor: '#E6F2EF',
  },
  {
    id: 2,
    name: 'GOV.UK Family Benefits',
    description:
      'Check what government benefits, tax credits, and childcare support you and your family are entitled to.',
    icon: Globe,
    color: '#0A2342',
    bgColor: '#EDF1F7',
  },
  {
    id: 3,
    name: 'Family Lives Helpline',
    description:
      'Free, confidential support for families. Call their helpline or access online resources for parenting advice.',
    icon: Phone,
    color: '#E3A14F',
    bgColor: '#FDF6EC',
  },
  {
    id: 4,
    name: 'NSPCC',
    description:
      'The UK\'s leading children\'s charity, providing safeguarding advice and support for parents and families.',
    icon: ShieldCheck,
    color: '#C94A4A',
    bgColor: '#FEF2F2',
  },
]

export function ExternalResourcesSection() {
  return (
    <section>
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6F6F6F] bg-[#F0ECE6] px-2.5 py-1 rounded-md mb-2">
          External
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-[#0A2342]">
          Trusted external resources
        </h2>
        <p className="text-sm text-[#6F6F6F] mt-1">
          Verified organisations offering free support for parents and families.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((resource) => {
          const Icon = resource.icon
          return (
            <div
              key={resource.id}
              className="group flex gap-4 p-5 bg-white rounded-xl border border-[#E7E2DA] hover:border-[#117A65]/30 hover:shadow-md transition-all cursor-pointer"
            >
              <div
                className="shrink-0 h-11 w-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: resource.bgColor }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: resource.color }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[#1C1C1C] group-hover:text-[#117A65] transition-colors">
                    {resource.name}
                  </h3>
                  <ExternalLink className="h-3 w-3 text-[#B0B0B0]" />
                </div>
                <p className="text-xs text-[#6F6F6F] leading-relaxed line-clamp-2">
                  {resource.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
