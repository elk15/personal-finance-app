/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': {
          500: '#98908B',
          100: '#f8f4f0'
        },
        'grey': {
          900: '#201f24',
          500: '#696868',
          300: '#B3B3B3',
          100: '#f2f2f2'
        },
        'white': '#fff',
        'green': '#277C78',
        'yellow': '#F2CDAC',
        'cyan': '#82C9D7',
        'navy': '#626070',
        'red': '#C94736',
        'purple': '#826CB0',
        'pink': '#AF81BA',
        'turquoise': '#597C7C',
        'brown': '#93674F',
        'magenta': '#934F6F',
        'blue': '#3F82B2',
        'navy-grey': '#97A0AC',
        'army-green': '#7F9161',
        'gold': '#CAB361',
        'orange': '#BE6C49',
      }
    },
  },
  plugins: [],
}

