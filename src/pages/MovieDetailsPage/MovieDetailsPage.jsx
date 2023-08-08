import styles from './MovieDetailsPage.module.css';
import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from 'react-router-dom';
import { fetchMovieDetails, IMAGE_URL } from 'services/api-movies';
import { BiCaretLeftCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || 'movies';

  useEffect(() => {
    const getDetailsMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getDetailsMovie();
  }, [movieId]);

  const onGoBack = () => {
    navigate(from);
  };

  return (
    <>
      {error && <p>Something goes wrong</p>}
      {loading && <Loader />}
      {!movie ? (
        <div className={styles.notFound}>This movie is not found</div>
      ) : (
        <>
          <button className={styles.button} type="button" onClick={onGoBack}>
            <IconContext.Provider
              value={{
                color: 'white',
                size: 22,
                className: 'global-class-name',
              }}
            >
              <div>
                <BiCaretLeftCircle />
              </div>
            </IconContext.Provider>
            <span>Go back</span>
          </button>
          <div className={styles.container}>
            <div className={styles.movieDetalis}>
              <div className={styles.movieImg}>
                <img
                  src={
                    movie.poster_path
                      ? IMAGE_URL + movie.poster_path
                      : `https://bitsofco.de/content/images/2018/12/broken-1.png`
                  }
                  alt={movie.original_title}
                  widht="300px"
                  className={styles.pictureMovie}
                />
              </div>

              <div>
                <h2 className={styles.title}>{movie.title}</h2>
                <p>User Score: {`${movie.vote_average.toFixed(1)}`}</p>
                <h3>Overview</h3>
                <p>{`${movie.overview}`}</p>
                <h3>Genres</h3>
                <p>{`${movie.genres.map(genre => genre.name).join(' / ')}`}</p>
              </div>
            </div>
            <hr />

            <div>
              <h3>Additional information</h3>
              <ul className={styles.list}>
                <li>
                  <Link className={styles.itemLink} to="cast" state={{ from }}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.itemLink}
                    to="reviews"
                    state={{ from }}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <hr />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
