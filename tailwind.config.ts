import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gw-primary': '#00D9FF', // Cyan
        'gw-primary-dark': '#0099CC',
        'gw-secondary': '#1F2937',
        'gw-background': '#0F1419',
        'gw-surface': '#1A1F2E',
        'gw-surface-light': '#242D3D',
        'gw-text': '#F0F4F8',
        'gw-text-muted': '#9CA3AF',
        'gw-accent': '#FF6B35',
        'gw-accent-dark': '#CC5429',
      },
      boxShadow: {
        'gw-glow': '0 0 20px rgba(0, 217, 255, 0.3)',
        'gw-glow-lg': '0 0 40px rgba(0, 217, 255, 0.5)',
      },
      backgroundImage: {
        'gw-gradient': 'linear-gradient(135deg, #0F1419 0%, #1A1F2E 100%)',
        'gw-gradient-cyan': 'linear-gradient(135deg, #00D9FF 0%, #0099CC 100%)',
      },
    },
  },
  plugins: [],
}
export default config
