module.exports = {
  content: ['./index.ts.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    gridTemplateColumns: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
      13: 'repeat(13, minmax(0, 1fr))',
      14: 'repeat(14, minmax(0, 1fr))',
      15: 'repeat(15, minmax(0, 1fr))',
      16: 'repeat(16, minmax(0, 1fr))',
      17: 'repeat(17, minmax(0, 1fr))',
      18: 'repeat(18, minmax(0, 1fr))',
      19: 'repeat(19, minmax(0, 1fr))',
      20: 'repeat(20, minmax(0, 1fr))',
      21: 'repeat(21, minmax(0, 1fr))',
      22: 'repeat(22, minmax(0, 1fr))',
      23: 'repeat(23, minmax(0, 1fr))',
      24: 'repeat(24, minmax(0, 1fr))',
    },
    minWidth: {
      '4': '4rem',
      '75': '75%'
    },
    minHeight: {
      '0': '0px',
      'full': '100%',
      'screen': '100vh',
      'notice': '5rem',
      '30': '30rem',
      '40': '40rem',
      '80': '80rem'
    },
    container: {
      center: true
    },
    extend: {
      animation: {
        shake: 'shake .8s ease-in-out'
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(+2px, 0, 0)' },
          '30%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(+4px, 0, 0)' },
          '50%': { transform: 'translate3d(-4px, 0, 0)' },
        }
      }
    },
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      ringOffsetWidth: ['hover'],
      ringWidth: ['hover'],
      margin: ['hover'],
      fontWeight: ['group-hover']
    }
  },
  plugins: [],
}
