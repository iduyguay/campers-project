import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';

function DetailsInProgress() {
  return (
    <main style={{ padding: '48px 64px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Camper details</h1>
      <p style={{ marginBottom: '24px' }}>The gallery, reviews and booking form are under development.</p>
      <Link to="/catalog" className="pageLink outlined">Back to catalog</Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<DetailsInProgress />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}