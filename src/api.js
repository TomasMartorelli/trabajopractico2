import axios from 'axios';

const apiKey = 'd5343d9d805485c0eb112ca8e81d7caa';
const baseUrl = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/popular`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.results;
};

export const getGenres = async () => {
  const response = await axios.get(`${baseUrl}/genre/movie/list`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.genres;
};

export const getMoviesByGenre = async (genreId) => {
  const response = await axios.get(`${baseUrl}/discover/movie`, {
    params: {
      api_key: apiKey,
      with_genres: genreId
    }
  });
  return response.data.results;
};
