import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F4F4F5',
          100: '#EDEDED',
          200: '#D6D6D7',
          300: '#B5B5B8',
          400: '#8A8A90',
          500: '#6B6B73',
          600: '#515158',
          700: '#3A3A40',
          800: '#1B1B1E',
          900: '#0B0B0D',
        },
        ivory: {
          50: '#FFFCF7',
          100: '#F7F3EE',
          200: '#EFE8DE',
          300: '#E6DDCF',
          400: '#D7C7B1',
          500: '#C7B093',
          600: '#AF9676',
          700: '#8E775D',
          800: '#6A5846',
          900: '#4A3E33',
        },
        gold: {
          50: '#FBF6EC',
          100: '#F5E9D0',
          200: '#EAD7A6',
          300: '#D9BE77',
          400: '#CDA75A',
          500: '#C8A45D',
          600: '#B18E4F',
          700: '#8F7240',
          800: '#6D5732',
          900: '#4F3F25',
        },
        smoke: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F2F2F2',
          300: '#E9E9E9',
          400: '#D6D6D6',
          500: '#BEBEBE',
          600: '#9A9A9A',
          700: '#6D6D6D',
          800: '#3F3F3F',
          900: '#1F1F1F',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-surface': 'linear-gradient(180deg, #FFFCF7 0%, #F7F3EE 100%)',
        'luxury-veil': 'linear-gradient(180deg, rgba(11,11,13,.72) 0%, rgba(11,11,13,.35) 45%, rgba(11,11,13,0) 100%)',
      },
      boxShadow: {
        luxe: '0 30px 80px rgba(11,11,13,.18)',
        luxeSoft: '0 18px 50px rgba(11,11,13,.12)',
      },
    },
  },
  plugins: [],
}
export default config

