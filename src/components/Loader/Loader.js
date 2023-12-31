import styles from './Loader.module.css';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <Circles
        height="150"
        width="150"
        color="#2316d2ea"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        className={styles.loader}
      />
    </div>
  );
};

export default Loader;