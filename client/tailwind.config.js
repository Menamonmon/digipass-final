module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3490DE",
          secondary: "#E1E2EF",
          accent: "#1FB2A6",
          neutral: "#3490DE",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Varela Round"],
        serif: ["Roboto Slab"],
      },
      colors: {
        primary: "#3490DE",
        secondary: "#E1E2EF",
        "text-light": "#E1E2EF",
        "primary-dark": "#05204A",
        "secondary-dark": "#ADAEBA",
        "text-dark": "#02020A",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
