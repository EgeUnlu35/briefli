export type Story = {
  id: string;
  category: string;
  title: string;
  summary: string;
  whyItMatters: string;
  context: string;
  imageUrl: string;
  source?: string;
  readTime: string;
};

export const mockNews: Story[] = [
  {
    id: '1',
    category: 'Technology',
    title: 'Major AI Labs Agree on New Safety Benchmarks',
    summary:
      'Top labs aligned on one safety baseline before shipping frontier model updates. The framework adds shared reporting checklists so teams can compare model behavior before public release.',
    whyItMatters:
      'Shared test standards make launches more comparable, reducing pressure to skip safety checks.',
    context:
      'The benchmark tracks hallucination reliability, misuse resistance, and model behavior disclosure.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    source: 'Joint lab statement',
    readTime: '35s',
  },
  {
    id: '2',
    category: 'Economy',
    title: 'Inflation Cools for Third Consecutive Month',
    summary:
      'Price growth eased again, with energy and transport trends pulling the index lower. Analysts say the slowdown is broad enough to influence consumer confidence in the coming quarter.',
    whyItMatters:
      'Lower inflation can improve household purchasing power and shift rate expectations.',
    context:
      'Core services are still sticky, but the recent trend supports a more stable policy outlook.',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    source: 'National statistics release',
    readTime: '30s',
  },
  {
    id: '3',
    category: 'World',
    title: 'Regional Summit Reaches Climate Infrastructure Pact',
    summary:
      'Twelve countries signed a financing pact for coastal resilience and grid upgrades. The agreement prioritizes shovel-ready projects with yearly accountability milestones across member states.',
    whyItMatters:
      'Funding clarity removes a major bottleneck and helps projects move from policy to execution.',
    context:
      'The pact includes common procurement targets and yearly delivery reviews across partners.',
    imageUrl:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    source: 'Regional summit communiqué',
    readTime: '40s',
  },
  {
    id: '4',
    category: 'Science',
    title: 'Researchers Announce Breakthrough in Battery Density',
    summary:
      'A solid-state prototype achieved higher density while keeping thermal performance stable. Early lab tests suggest the chemistry could improve range without sacrificing charging safety.',
    whyItMatters:
      'Higher density batteries can lower EV costs and reduce range anxiety.',
    context:
      'Pilot manufacturing is underway, though commercial rollout remains in early stages.',
    imageUrl:
      'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&w=1200&q=80',
    source: 'Peer-reviewed research release',
    readTime: '30s',
  },
  {
    id: '5',
    category: 'Business',
    title: 'Global Retailers Expand Same-Day Logistics Networks',
    summary:
      'Major retailers are adding local hubs and smarter routing to tighten delivery windows. New forecasting tools are also reducing failed deliveries in high-demand neighborhoods.',
    whyItMatters:
      'Faster shipping raises customer expectations and pressures smaller merchants to adapt quickly.',
    context:
      'The strategy is cost-heavy upfront but correlated with stronger retention in dense cities.',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    source: 'Industry logistics report',
    readTime: '25s',
  },
  {
    id: '6',
    category: 'Health',
    title: 'New Public Health Dashboard Tracks Respiratory Trends',
    summary:
      'A new dashboard combines hospital, testing, and wastewater signals in one view. Local officials can now monitor early warning indicators in near real time instead of weekly snapshots.',
    whyItMatters:
      'Earlier detection gives local teams more lead time to prepare staffing and supplies.',
    context:
      'The system is designed for weekly trend visibility instead of delayed retrospective analysis.',
    imageUrl:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    source: 'Public health agency update',
    readTime: '30s',
  },
  {
    id: '7',
    category: 'Culture',
    title: 'Streaming Platforms Shift Toward Weekly Release Cadence',
    summary:
      'Studios are moving from full-season drops to weekly episodes for major titles. Platform teams report that staggered releases keep audience discussion active for longer periods.',
    whyItMatters:
      'Weekly cadence extends audience engagement and improves retention windows for platforms.',
    context:
      'Executives report lower churn and longer social conversation cycles around each release.',
    imageUrl:
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80',
    source: 'Streaming earnings commentary',
    readTime: '20s',
  },
];
