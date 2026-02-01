// Ghostwire Futuristic Masculine Theme
export const ghostwireTheme = {
  colors: {
    primary: '#00D9FF', // Cyan - futuristic accent
    primaryDark: '#0099CC', // Deep cyan
    secondary: '#1F2937', // Dark charcoal
    background: '#0F1419', // Almost black
    surface: '#1A1F2E', // Dark surface
    surfaceLight: '#242D3D', // Lighter surface
    text: '#F0F4F8', // Almost white text
    textMuted: '#9CA3AF', // Muted text
    accent: '#FF6B35', // Orange accent
    accentDark: '#CC5429', // Dark orange
    success: '#10B981', // Green for success
    warning: '#F59E0B', // Amber for warning
    error: '#EF4444', // Red for errors
    border: '#374151', // Border color
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.7)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.8)',
    glow: '0 0 20px rgba(0, 217, 255, 0.3)',
    glowLg: '0 0 40px rgba(0, 217, 255, 0.5)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
}

export type GhostwireTheme = typeof ghostwireTheme
