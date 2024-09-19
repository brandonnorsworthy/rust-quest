/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // figma
        primary: "#24221C",
        secondary: {
          DEFAULT: "#1C211B",
          highlight: "#272820",
        },

        text: {
          DEFAULT: "#F2E6DC",
          secondary: {
            DEFAULT: "#AFA79F",
            highlight: "#64605A",
          },
        },

        buttonText: {
          DEFAULT: "#CBC1B9",
          info: "#429DDE",
          cancel: "#EBC8C2",
          confirm: "#A8DC4D"
        },
        buttonBackground: {
          DEFAULT: "#2E302E",
          hover: "hsl(120, 8%, 24%)",
          info: {
            DEFAULT: "#154061",
            hover: "hsl(206, 70%, 29%)"
          },
          cancel: {
            DEFAULT: "#873023",
            hover: "hsl(8, 66%, 39%)"
          },
          confirm: {
            DEFAULT: "#657B3C",
            hover: "hsl(81, 40%, 42%)"
          }
        },
      },
      fontFamily: {
        'rust': ['"Roboto Condensed"', 'sans-serif'],
        'roboto': ['"Roboto"', 'sans-serif'],
      },

      // styling for the markdown content
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.DEFAULT'),
            h1: {
              color: theme('colors.text.DEFAULT'),
              textAlign: 'center',
            },
            h2: {
              color: theme('colors.text.DEFAULT'),
            },
            a: {
              color: theme('colors.buttonText.info'),
              '&:hover': {
                color: theme('colors.buttonBackground.info'),
              },
            },
            strong: {
              color: theme('colors.text.secondary.DEFAULT'),
            },
            pre: {
              backgroundColor: theme('colors.secondary.DEFAULT'),
            }
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': '1px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-modern': {
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }
      })
    })
  ],
}