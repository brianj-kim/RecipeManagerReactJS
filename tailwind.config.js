module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      serif: ['Aleo', 'serif']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
