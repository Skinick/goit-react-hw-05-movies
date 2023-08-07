import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'services/api-movies';
import Loader from 'components/Loader/Loader';
import MoviesEditorList from 'components/MoviesEditorList/MoviesEditorList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <main>
      {loading && <Loader />}
      <h1 className={styles.title}>Tranding today</h1>
      {movies && <MoviesEditorList movies={movies} />}
      {error && <p>Something goes wrong</p>}
    </main>
  );
};

export default HomePage;
