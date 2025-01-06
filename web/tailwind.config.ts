import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      backgroundImage: {
        buttonGradient: "linear-gradient(180deg, #00ADB5 0%, #004C4F 100%)",
        getstartbutton:"linear-gradient(180deg, #00ADB5 0%, #000 100%)",
        trustedGradient:"linear-gradient(180deg, #FFF 0%, #E5FAFF 100%)"
      },
      colors: {
        brand: {
          darkcyan: "#004C4F",
          white: "#FFFFFF",
          cyan: "#00ADB5",
          blue50: "#fafeff",
          grayBorder: "#CBD5E1",
          oppla: "#0F172A33",
          darkGreen: "#0F172A",
          lightBlack: "#2F2F2F",
          stone:"#343E46",
          gray:"#8C8C8C"
        },
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '24' : "24px",
      '25' : "25px"
    },
    fontFamily: {
      Roboto: "Roboto,sans-serif",
      Rufina: "Rufina, serif",
    },
    boxShadow: {
      buttonShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.25)",
      getstartbuttonShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
      customerReviewSahdow:"4px 4px 4px 0px rgba(0, 0, 0, 0.25);",
      whyChooseSahdow:"0px 0px 20px 0px rgba(0, 0, 0, 0.10)",
      'custom': '0 1px 12px -2px rgba(0, 0, 0, 0.14)',
    },
    screens: {
      lsm: "350px",

      esm: "400px",

      em: "480px",

      ew: "510px",

      vem: "560px",

      sm: "640px",

      md: "768px",

      mmd: "860px",

      emd: "999px",

      lg: "1024px",

      xlg: "1150px",

      xl: "1280px",

      "1xl": "1440px",

      "2xl": "1536px",

      "3xl": "1600px",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
