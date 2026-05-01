import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    './content/**/*.{md,mdx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '3rem'
      },
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        sand: {
          25: '#f8f5f0',
          50: '#f3ede5',
          100: '#e6dccf',
          200: '#d7c4ab',
          300: '#c4a788',
          400: '#ad8764',
          500: '#95694b',
          600: '#7a523a',
          700: '#62412f',
          800: '#4a3225',
          900: '#362419',
          950: '#21160f'
        },
        amber: {
          50: '#fff7e6',
          100: '#ffebc2',
          200: '#fed688',
          300: '#fcb24d',
          400: '#f58d1c',
          500: '#e9730a',
          600: '#c75a05',
          700: '#9e4508',
          800: '#7e370c',
          900: '#672b0d'
        },
        charcoal: {
          50: '#f5f6f7',
          100: '#e6e8ea',
          200: '#cbd0d5',
          300: '#a2aab2',
          400: '#7b8590',
          500: '#5d6974',
          600: '#434e59',
          700: '#2f3840',
          800: '#20282d',
          900: '#13181b',
          950: '#090c0e'
        }
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui'],
        arabic: ['"Noto Sans Arabic"', 'system-ui']
      },
      boxShadow: {
        glass: '0 32px 80px -40px rgba(18, 12, 8, 0.45)',
        card: '0 24px 60px -32px rgba(18, 12, 8, 0.3)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite'
      }
    }
  },
  safelist: ['dir-rtl', 'dir-ltr'],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
    }),
    animate
  ]
};

export default config;
