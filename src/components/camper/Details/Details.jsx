import { useSelector } from 'react-redux';
import { selectCamperDetails } from '@redux/campersSelectors';
import css from './Details.module.css';
const forms = { panelTruck: 'Panel truck', fullyIntegrated: 'Integrated', semiIntegrated: 'Semi Integrated', alcove: 'Alcove' };
const formatUnit = value => String(value ?? '—').replace(/(\d)([a-z])/gi, '$1 $2').replace(/\//g, ' / ');
export default function Details() {
  const camper = useSelector(selectCamperDetails);
  const details = { Form: forms[camper.form] || camper.form, Length: formatUnit(camper.length), Width: formatUnit(camper.width), Height: formatUnit(camper.height), Tank: formatUnit(camper.tank), Consumption: formatUnit(camper.consumption) };
  return <dl className={css.detailsList}>{Object.entries(details).map(([label, value]) => <div className={css.detailsItem} key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}
