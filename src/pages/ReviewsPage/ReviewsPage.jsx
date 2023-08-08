import styles from './ReviewsPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { fetchMovieReviews } from 'services/api-movies';

const ReviewsPage = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      setLoading(true);
      try {
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {error && <p>Something goes wrong</p>}
      {loading && <Loader />}
      {reviews.length !== 0 && (
        <div>
          <ul>
            {reviews.map(review => (
              <li key={review.id} className={styles.reviewsitem}>
                <h2>Author: {review.author}</h2>
                <p className={styles.reviewstext}>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reviews.length === 0 && (
        <div>We don't have any reviews for this movie</div>
      )}
    </>
  );
};

export default ReviewsPage;
