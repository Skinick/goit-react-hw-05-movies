import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'services/api-movies';
import MoviesList from 'pages/MoviesList/MoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTrending();
  }, []);
  console.log(movies);

  return (
    <main>
      <h1>Tranding today</h1>
      {movies && <MoviesList movies={movies} />}
      {error && <p>Something goes wrong</p>}
    </main>
  );
};
export default HomePage;
