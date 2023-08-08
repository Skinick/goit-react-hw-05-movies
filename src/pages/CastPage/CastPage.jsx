import styles from './CastPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { fetchMovieActors, IMAGE_URL } from 'services/api-movies';

const CastPage = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieActors = async () => {
      setLoading(true);
      try {
        const { cast } = await fetchMovieActors(movieId);

        setActors(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieActors();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Something goes wrong</p>}
      <ul className={styles.list}>
        {actors.map(actor => (
          <li className={styles.item} key={actor.id}>
            <img
              className={styles.foto}
              width="200px"
              src={
                actor.profile_path
                  ? IMAGE_URL + actor.profile_path
                  : `https://bitsofco.de/content/images/2018/12/broken-1.png`
              }
              alt={actor.original_name}
            />
            <div className={styles.info}>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastPage;