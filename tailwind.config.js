const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors:{
        'green-1':'#00850D',
        'green-2':'#001402',
        'yellow-1':'#FFFF00',
        'bg-1':'#323232',
        'bg-2':'#292929',
      }
    },
    container:{
      center:true,
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    // themes: true,
    themes: [
      {
        mytheme: {
          "primary": "#570DF8",
          "secondary": "#44403c",
          "accent": "#00FF00",
          "neutral": "#3ABFF8",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#eab308",
          "error": "#ef4444",
        },
      }
      , 'light'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
}
