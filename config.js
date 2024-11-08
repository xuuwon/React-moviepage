const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // .env 파일에서 가져오기
const API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN; // .env 파일에서 가져오기

export { BASE_URL, API_KEY, API_READ_ACCESS_TOKEN, IMG_BASE_URL };