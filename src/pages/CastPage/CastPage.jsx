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
        console.log(cast);
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
      <ul>
        {actors.map(actor => (
          <li key={actor.id}>
            <img
              width="200px"
              src={IMAGE_URL + actor.profile_path}
              alt={actor.original_name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastPage;
