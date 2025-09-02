/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        poppins: "poppins",
        questrial: "Questrial",
      },
      colors: {
        primary: "#c20202c7",
        secondary: "#3340949c",
        secondaryOrange: "#111010ff",
        "main-bg": "#e2e2e2a9",
        "main-dark": "#100f0ff9",
        "card-dark": "rgba(20, 23, 30, 0.15)",
        "dark-light": "#353949",
        "hover-color-dark": "#4a414115",
        dark: "#323232ff",
      },
      gridTemplateColumns: {
        "16-auto": "250px auto",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float-particle': 'floatParticle 3s ease-in-out infinite',
        'fall-letter-1': 'fallLetter1 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        'fall-letter-2': 'fallLetter2 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s forwards',
        'fall-letter-3': 'fallLetter3 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s forwards',
        'fall-letter-4': 'fallLetter4 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards',
        'fall-letter-5': 'fallLetter5 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.8s forwards',
        'fall-letter-6': 'fallLetter5 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) 1s forwards',
        'fade-up-1': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.2s forwards',
        'fade-up-2': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.3s forwards',
        'fade-up-3': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.4s forwards',
        'fade-up-4': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.5s forwards',
        'fade-up-5': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.6s forwards',
        'fade-up-6': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.7s forwards',
        'fade-up-7': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.8s forwards',
        'fade-up-8': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 1.9s forwards',
        'fade-up-9': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 2.0s forwards',
        'fade-up-10': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 2.1s forwards',
        'fade-up-11': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 2.2s forwards',
        'fade-up-12': 'fadeUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) 2.3s forwards',
        'spiral-center': 'spiralCenter 2.5s ease-in-out forwards',
        'spiral-arm': 'spiralArm 2.5s ease-in-out forwards',
        'spiral-ring': 'spiralRing 2.5s ease-in-out forwards',
        'spiral-particle': 'spiralParticle 2.5s ease-in-out forwards',
        'spiral-expand': 'spiralExpand 2.5s ease-in-out forwards',
      },
      keyframes: {
        floatParticle: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px) scale(1.2)', opacity: '0.8' },
        },
        fallLetter1: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '60%': { transform: 'translateY(15px) rotate(360deg)', opacity: '0.8' },
          '80%': { transform: 'translateY(-5px) rotate(360deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(0) rotate(360deg)', opacity: '1' },
        },
        fallLetter2: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '60%': { transform: 'translateY(15px) rotate(-360deg)', opacity: '0.8' },
          '80%': { transform: 'translateY(-5px) rotate(-360deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(0) rotate(-360deg)', opacity: '1' },
        },
        fallLetter3: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '60%': { transform: 'translateY(15px) rotate(720deg)', opacity: '0.8' },
          '80%': { transform: 'translateY(-5px) rotate(720deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(0) rotate(720deg)', opacity: '1' },
        },
        fallLetter4: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '60%': { transform: 'translateY(15px) rotate(-720deg)', opacity: '0.8' },
          '80%': { transform: 'translateY(-5px) rotate(-720deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(0) rotate(-720deg)', opacity: '1' },
        },
        fallLetter5: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '60%': { transform: 'translateY(15px) rotate(1080deg)', opacity: '0.8' },
          '80%': { transform: 'translateY(-5px) rotate(1080deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(0) rotate(1080deg)', opacity: '1' },
        },
        spiralCenter: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        spiralArm: {
          '0%': { height: '0', opacity: '0' },
          '50%': { height: '24rem', opacity: '0.5' },
          '100%': { height: '0', opacity: '0', transform: 'rotate(45deg)' },
        },
        spiralRing: {
          '0%': { transform: 'scale(0.5) rotate(0deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(2) rotate(360deg)', opacity: '0' },
        },
        spiralParticle: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translate(100px, 100px) scale(0)', opacity: '0' },
        },
        spiralExpand: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '60%': { transform: 'translateY(-5px)', opacity: '0.8' },
          '80%': { transform: 'translateY(2px)', opacity: '0.9' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-muted": {
          opacity: 0.8,
        },
        ".transition-a": {
          transition: "all 0.3s ease-in-out",
        },
        ".card-shadow": {
          boxShadow: " 0 0 0.8rem 0.25rem rgba(0, 0, 0, 0.1)",
        },
        ".shadow-light": {
          boxShadow: "0.1rem 0.1rem 0.3rem .1rem rgba(0, 0, 0, 0.05)",
        },
        ".border-light": {
          border: "1px solid rgba(46, 46, 46, 0.1)",
        },
        ".input-shadow": {
          boxShadow: "0 0 0 1000px #f5f5f9 inset !important",
        },
        ".input-dark-shadow": {
          boxShadow: "0 0 0 1000px #13131A inset !important",
        },
        ".inputAutofillColor": {
          "-webkit-text-fill-color": "#ccc",
        },
        ".flex-center-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".flex-align-center": {
          display: "flex",
          alignItems: "center",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
