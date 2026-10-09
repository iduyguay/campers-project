import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Overview, Description, BookingForm, Features, Reviews, Button } from '@components';
import Gallery from '@components/Gallery';
import LoadingOverlay from '@components/LoadingOverlay';
import { NotFound } from '@pages';
import { fetchCamperById } from '@redux/campersOperations';
import { selectLoading, selectError, selectCamperDetails } from '@redux/campersSelectors';
import { clearCamperDetails } from '@redux/campersSlice';
import css from './Details.module.css';
export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamperDetails);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const valid = /^[0-9]+$/.test(id);
  useEffect(() => {
    if (valid) dispatch(fetchCamperById(id));
    return () => { dispatch(clearCamperDetails()); };
  }, [dispatch, id, valid]);
  if (!valid || error === 'NOT_FOUND') return <NotFound path="/catalog" pageName="Catalog" />;
  if (error) return <main className={css.error} role="alert"><h1>Unable to load this camper</h1><Button outlined onClick={() => dispatch(fetchCamperById(id))}>Try again</Button><Link to="/catalog">Back to catalog</Link></main>;
  if (!camper || loading) return <main><LoadingOverlay /></main>;
  return <main className={css.details}>
    <div className={css.top}>
      <Gallery images={camper.gallery} name={camper.name} key={id} />
      <div className={css.information}>
        <section className={css.summary} aria-label="Camper overview"><Overview {...camper} /><Description description={camper.description} /></section>
        <Features />
      </div>
    </div>
    <section className={css.bottom} aria-labelledby="reviews-heading">
      <div><h2 id="reviews-heading">Reviews</h2><Reviews /></div>
      <BookingForm camperId={id} />
    </section>
  </main>;
}
