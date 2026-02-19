import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  Calculator,
  ClipboardList,
  BookMarked,
} from 'lucide-react'

const toolkits = [
  {
    id: 1,
    title: 'Parental leave checklist',
    description:
      'Step-by-step guide to preparing for and managing your parental leave, from telling your employer to planning your return.',
    icon: ClipboardList,
    href: '/hub',
    color: '#117A65',
    bgColor: '#E6F2EF',
  },
  {
    id: 2,
    title: 'Benefits calculator',
    description:
      'Calculate what benefits and allowances you may be entitled to based on your circumstances.',
    icon: Calculator,
    href: '/hub',
    color: '#E3A14F',
    bgColor: '#FDF6EC',
  },
  {
    id: 3,
    title: 'Return to work planner',
    description:
      'A practical toolkit to help you plan your return to work with confidence.',
    icon: FileText,
    href: '/hub',
    color: '#0A2342',
    bgColor: '#EDF1F7',
  },
  {
    id: 4,
    title: 'Resource library',
    description:
      'Browse our curated collection of guides, templates and useful documents.',
    icon: BookMarked,
    href: '/hub',
    color: '#7C3AED',
    bgColor: '#F3EEFF',
  },
]

export function ToolkitsSection() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#7C3AED] bg-[#F3EEFF] px-2.5 py-1 rounded-md mb-2">
            Tools
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2342]">
            Toolkits &amp; resources
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Practical tools to help you at every stage.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {toolkits.map((toolkit) => {
          const Icon = toolkit.icon
          return (
            <Link
              key={toolkit.id}
              href={toolkit.href}
              className="group flex flex-col p-5 bg-white rounded-xl border border-[#E7E2DA] hover:border-[#117A65]/30 hover:shadow-md transition-all"
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: toolkit.bgColor }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: toolkit.color }}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#1C1C1C] group-hover:text-[#117A65] transition-colors mb-1">
                {toolkit.title}
              </h3>
              <p className="text-xs text-[#6F6F6F] leading-relaxed line-clamp-2 flex-1">
                {toolkit.description}
              </p>
              <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#117A65]">
                Open
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
