export default {
  theme: {
    extend: {
      animation: {
        'pulse-delay': 'pulse 1.5s ease-in-out infinite',
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
      }
    }
  },
  plugins: [
    function({ addUtilities, theme }) {
      const delays = theme('animationDelay');
      addUtilities(Object.fromEntries(
        Object.entries(delays).map(([k, v]) => [`.animation-delay-${k}`, { 'animation-delay': v }])
      ));
    }
  ]
}
