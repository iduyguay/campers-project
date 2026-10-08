import { Link } from 'react-router-dom';
import css from './Catalog.module.css';

export default function Catalog() {
  return (
    <main className={css.main}>
      <h1>Campers catalog</h1>
      <p>The catalog is under development. Camper listings and filters will be added next.</p>
      <Link to="/" className="pageLink outlined">Back to home</Link>
    </main>
  );
}
