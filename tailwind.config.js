/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더에 있는 모든 JS, JSX, TS, TSX 파일에 Tailwind CSS가 적용되도록 설정
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px', // 500px 이상일 때 xs 클래스를 사용 가능
      },
    },
  },
  plugins: [],
}
