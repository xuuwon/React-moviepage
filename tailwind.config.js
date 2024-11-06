/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더에 있는 모든 JS, JSX, TS, TSX 파일에 Tailwind CSS가 적용되도록 설정
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

