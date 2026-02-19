import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
  Heart,
  Brain,
  Briefcase,
} from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'Returning to work after maternity leave',
    description:
      'A practical guide to navigating the transition back to work, from planning conversations with your employer to managing childcare.',
    category: 'Career',
    readTime: '5 min read',
    icon: Briefcase,
    color: '#117A65',
    bgColor: '#E6F2EF',
  },
  {
    id: 2,
    title: 'Managing parental wellbeing and stress',
    description:
      'Expert tips on looking after your mental health as a parent, including mindfulness techniques and when to seek support.',
    category: 'Wellbeing',
    readTime: '4 min read',
    icon: Heart,
    color: '#C94A4A',
    bgColor: '#FEF2F2',
  },
  {
    id: 3,
    title: 'Understanding your childcare options',
    description:
      'From nurseries to childminders, explore the different childcare options available and find what works best for your family.',
    category: 'Childcare',
    readTime: '6 min read',
    icon: Brain,
    color: '#E3A14F',
    bgColor: '#FDF6EC',
  },
  {
    id: 4,
    title: 'Financial planning for growing families',
    description:
      'Make the most of your benefits, tax allowances and savings options. A comprehensive guide to family finances.',
    category: 'Finance',
    readTime: '7 min read',
    icon: TrendingUp,
    color: '#0A2342',
    bgColor: '#EDF1F7',
  },
]

export function ArticlesSection() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#0A2342] bg-[#EDF1F7] px-2.5 py-1 rounded-md mb-2">
            Learn
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2342]">
            Articles &amp; tips
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Expert guidance and resources for every stage of parenthood.
          </p>
        </div>
        <Link
          href="/hub"
          className="hidden md:flex items-center gap-1 text-sm font-medium text-[#117A65] hover:text-[#0e6655] transition-colors whitespace-nowrap"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => {
          const Icon = article.icon
          return (
            <Link
              key={article.id}
              href="/hub"
              className="group flex gap-4 p-4 bg-white rounded-xl border border-[#E7E2DA] hover:border-[#117A65]/30 hover:shadow-md transition-all"
            >
              <div
                className="shrink-0 h-12 w-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: article.bgColor }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: article.color }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: article.color }}
                  >
                    {article.category}
                  </span>
                  <span className="text-[#B0B0B0]">&middot;</span>
                  <span className="text-[11px] text-[#B0B0B0] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#1C1C1C] group-hover:text-[#117A65] transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <p className="text-xs text-[#6F6F6F] mt-0.5 line-clamp-2">
                  {article.description}
                </p>
              </div>
              <ArrowRight className="shrink-0 h-4 w-4 text-[#B0B0B0] group-hover:text-[#117A65] transition-colors mt-1" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
