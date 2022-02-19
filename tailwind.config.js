module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    minWidth: {
      '4': '4rem'
    },
    container: {
      center: true
    },
    extend: {},
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
