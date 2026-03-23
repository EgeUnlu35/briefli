export const colors = {
  background: '#F8FAFA',
  card: '#FFFFFF',
  primary: '#4E6073',
  primaryDim: '#425467',
  primaryContainer: '#D1E4FB',
  text: '#2A3435',
  secondaryText: '#566162',
  tertiaryText: '#727D7E',
  secondary: '#2D6583',
  secondaryContainer: '#C6E7FF',
  success: '#16A34A',
  border: '#E5E7EB',
  surfaceContainerLow: '#F0F4F5',
  surfaceContainerHigh: '#E1EAEB',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800' as const,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
  },
  headline: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
  },
} as const;
