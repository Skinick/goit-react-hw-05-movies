import BeatLoader from 'react-spinners/ClipLoader';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <BeatLoader size={250} color={'#461646'} className={styles.loader} />
    </div>
  );
};
export default Loader;