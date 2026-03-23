export type Story = {
  id: string;
  category: string;
  title: string;
  summary: string;
  why: string;
  readTime: string;
};

export const mockNews: Story[] = [
  {
    id: '1',
    category: 'Technology',
    title: 'Major AI Labs Agree on New Safety Benchmarks',
    summary:
      'Several leading AI labs have adopted a shared evaluation framework for testing model safety before public release. The benchmark focuses on hallucination rates, misuse resistance, and transparency of model behavior.',
    why: 'Shared standards could make AI rollouts more predictable and reduce risky competition dynamics.',
    readTime: '35s',
  },
  {
    id: '2',
    category: 'Economy',
    title: 'Inflation Cools for Third Consecutive Month',
    summary:
      'Latest consumer price data shows slower year-over-year growth across energy and transportation categories. Core services remain elevated, but trend lines suggest easing pressure for households.',
    why: 'A sustained cooldown may influence borrowing costs, wages, and central bank policy decisions.',
    readTime: '30s',
  },
  {
    id: '3',
    category: 'World',
    title: 'Regional Summit Reaches Climate Infrastructure Pact',
    summary:
      'Twelve countries signed a financing plan to accelerate coastal resilience projects and grid modernization. The agreement includes shared procurement targets and annual progress reviews.',
    why: 'Infrastructure timelines now have clearer funding paths, which can speed up adaptation outcomes.',
    readTime: '40s',
  },
  {
    id: '4',
    category: 'Science',
    title: 'Researchers Announce Breakthrough in Battery Density',
    summary:
      'A new solid-state design demonstrated higher energy density in controlled tests while maintaining thermal stability. Commercial deployment is still early, but pilot manufacturing has begun.',
    why: 'Better batteries can lower EV costs and improve reliability for renewable energy storage.',
    readTime: '30s',
  },
  {
    id: '5',
    category: 'Business',
    title: 'Global Retailers Expand Same-Day Logistics Networks',
    summary:
      'Retail giants are increasing local warehouse footprints and routing automation to reduce delivery windows. Analysts note higher upfront costs but stronger customer retention in urban markets.',
    why: 'Faster logistics can reshape consumer expectations and increase pressure on smaller competitors.',
    readTime: '25s',
  },
  {
    id: '6',
    category: 'Health',
    title: 'New Public Health Dashboard Tracks Respiratory Trends',
    summary:
      'Health agencies launched a unified dashboard combining hospital intake, testing, and wastewater indicators. The platform aims to provide earlier detection of regional spikes.',
    why: 'Earlier warning signals support faster local response and better resource planning.',
    readTime: '30s',
  },
  {
    id: '7',
    category: 'Culture',
    title: 'Streaming Platforms Shift Toward Weekly Release Cadence',
    summary:
      'Several major platforms are moving away from full-season drops to weekly episode releases. Executives say the strategy increases sustained engagement and lowers churn.',
    why: 'Release strategy changes affect audience habits, subscription value, and media conversation cycles.',
    readTime: '20s',
  },
];
