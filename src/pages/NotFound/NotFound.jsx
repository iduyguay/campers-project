import { Link } from 'react-router-dom';

import css from './NotFound.module.css';

export default function NotFound({ path, pageName }) {
  return (
    <main className={css.notFoundWrapper}>
      <h1 className={css.title}>Oops!</h1>
      <p className={css.desc}>Sorry, we couldn’t find this page or camper.</p>
      <p className={css.errorText}>Not Found</p>
      <Link className={css.link} to={path}>
        Back to {pageName} page
      </Link>
    </main>
  );
}
