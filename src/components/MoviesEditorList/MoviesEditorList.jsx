import styles from './MoviesEditorList.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MoviesEditorList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies &&
        movies.map(({ id, title }) => (
          <li key={id} className={styles.movielink}>
            <Link
              className={styles.link}
              to={`/movies/${id}`}
              state={{ from: location }}
            >
              {title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

MoviesEditorList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default MoviesEditorList;
