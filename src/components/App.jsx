import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
//import HomePage from 'pages/HomePage/HomePage';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));

const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));

const App = () => {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Container>
  );
};

export default App;
