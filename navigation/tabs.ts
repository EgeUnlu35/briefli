export type TabRouteName = 'index' | 'ai' | 'profile';

export type TabRouteConfig = {
  name: TabRouteName;
  title: string;
  icon: 'newspaper.fill' | 'sparkles' | 'person.fill';
};

export const tabRoutes: TabRouteConfig[] = [
  {
    name: 'index',
    title: 'Today',
    icon: 'newspaper.fill',
  },
  {
    name: 'ai',
    title: 'AI',
    icon: 'sparkles',
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'person.fill',
  },
];
