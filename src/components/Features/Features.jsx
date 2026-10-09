import { useSelector } from 'react-redux';
import { selectCamperDetails } from '@redux/campersSelectors';
import { Details, BadgesList } from '@components';
import css from './Features.module.css';
export default function Features() {
  const camper = useSelector(selectCamperDetails);
  return <section className={css.features} aria-label="Vehicle details"><h2>Vehicle details</h2><BadgesList camper={camper} /><Details /></section>;
}
