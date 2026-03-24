/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFA',
        card: '#FFFFFF',
        primary: '#4E6073',
        'primary-dim': '#425467',
        'primary-container': '#D1E4FB',
        text: '#2A3435',
        'secondary-text': '#566162',
        'tertiary-text': '#727D7E',
        secondary: '#2D6583',
        'secondary-container': '#C6E7FF',
        success: '#16A34A',
        border: '#E5E7EB',
        'surface-low': '#F0F4F5',
        'surface-high': '#E1EAEB',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px',
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '20px',
        pill: '999px',
      },
      fontSize: {
        display: ['34px', { lineHeight: '40px', fontWeight: '800' }],
        title: ['24px', { lineHeight: '30px', fontWeight: '700' }],
        headline: ['28px', { lineHeight: '34px', fontWeight: '800' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-strong': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        caption: ['13px', { lineHeight: '18px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
};
