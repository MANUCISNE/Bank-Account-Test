import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        theme: {
          green: '#00875F',
          'green-light': '#00B37E',
          'green-dark': '#015F43',
          red: '#F75A68',
          'red-dark': '#AA2834',
          'gray1-background': '#121214',
          'gray2-shape-main': '#202024',
          'gray3-shape-secondary': '#29292E',
          'gray4-shape-tertiary': '#323238',
          'gray5-placeholder': '#7C7C8A',
          'gray6-base-text': '#C4C4CC',
          'gray7-titles': '#E1E1E6',
        },
      },
     
    },
  },
  plugins: [],
}
export default config
