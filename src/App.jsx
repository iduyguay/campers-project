import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '@components/Header/Header';
import LoadingOverlay from '@components/LoadingOverlay';
const Home = lazy(() => import('@pages/Home/Home'));
const Catalog = lazy(() => import('@pages/Catalog/Catalog'));
const Details = lazy(() => import('@pages/Details/Details'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));
export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Details />} />
          <Route path="*" element={<NotFound path="/" pageName="Home" />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}
