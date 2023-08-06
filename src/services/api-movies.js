import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '9ae032ed2f68874d6db20f5419096693',
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async () => {
  const { data } = await instance.get('/trending/movie/day');
  return data;
};

export const searchMovies = async query => {
  const { data } = await instance.get('search/movie', {
    params: {
      page: 1,
      include_adult: false,
      query,
    },
  });

  return data;
};
