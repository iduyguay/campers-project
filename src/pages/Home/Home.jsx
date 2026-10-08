import { Link } from 'react-router-dom';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import css from './Home.module.css';

function Home() {
  return (
    <main className={css.main} data-page="home">
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.slogan}>
        You can find everything you want in our catalog
      </p>
      <Link to="/catalog" className="pageLink filled">
        View Now
      </Link>
      <nav className={css.socialLinks} aria-label="Developer profiles">
        <a href="https://github.com/iduyguay" target="_blank" rel="noopener noreferrer">
          <BsGithub size={20} aria-hidden="true" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ipekduyguay/" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size={20} aria-hidden="true" />
          LinkedIn
        </a>
      </nav>
    </main>
  );
}

export default Home;
