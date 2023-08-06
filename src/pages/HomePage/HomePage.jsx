import styles from './HomePage.module.css'
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'services/api-movies';
import MoviesEditorList from 'components/MoviesEditorList/MoviesEditorList';

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

  return (
    <main>
      <h1 className={styles.title}>Tranding today</h1>
      {movies && <MoviesEditorList movies={movies} />}
      {error && <p>Something goes wrong</p>}
    </main>
  );
};

export default HomePage;
