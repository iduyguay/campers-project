import { useDispatch, useSelector } from 'react-redux';
import { BsMap, BsX } from 'react-icons/bs';
import { updateFilters, emptyFilters } from '@redux/filtersSlice';
import { selectFilters } from '@redux/filtersSelectors';
import { changePage } from '@redux/campersSlice';
import { fetchCampers } from '@redux/campersOperations';
import { Button } from '@components';
import css from './CampersFilter.module.css';

const groups = [
  { name: 'form', title: 'Camper form', options: [['alcove', 'Alcove'], ['panelTruck', 'Panel Van'], ['fullyIntegrated', 'Integrated'], ['semiIntegrated', 'Semi Integrated']] },
  { name: 'engine', title: 'Engine', options: [['diesel', 'Diesel'], ['petrol', 'Petrol'], ['hybrid', 'Hybrid'], ['electric', 'Electric']] },
  { name: 'transmission', title: 'Transmission', options: [['automatic', 'Automatic'], ['manual', 'Manual']] },
];
const equipment = [['AC', 'AC'], ['kitchen', 'Kitchen'], ['bathroom', 'Bathroom'], ['TV', 'TV']];

export default function CampersFilter() {
  const dispatch = useDispatch();
  const { draft } = useSelector(selectFilters);
  const values = draft || emptyFilters;
  const change = (name, value) => dispatch(updateFilters({ ...values, [name]: value }));
  const search = event => {
    event.preventDefault();
    dispatch(changePage(1));
    dispatch(fetchCampers({ filters: values }));
  };
  const clear = () => {
    dispatch(updateFilters({ ...emptyFilters }));
    dispatch(changePage(1));
    dispatch(fetchCampers({ filters: emptyFilters }));
  };
  return (
    <aside className={css.filters} aria-label="Camper filters">
      <form className={css.form} onSubmit={search}>
        <label className={css.location}>Location
          <span className={css.inputWrap}><BsMap size={20} aria-hidden="true" /><input name="location" placeholder="City" value={values.location} onChange={event => change('location', event.target.value)} /></span>
        </label>
        <h2>Filters</h2>
        {groups.map(group => <fieldset className={css.group} key={group.name}>
          <legend>{group.title}</legend>
          {group.options.map(([value, label]) => <label className={css.option} key={value}>
            <input type="radio" name={group.name} value={value} checked={values[group.name] === value} onChange={() => change(group.name, value)} />{label}
          </label>)}
        </fieldset>)}
        <details className={css.equipment}>
          <summary>Vehicle equipment</summary>
          <div>{equipment.map(([name, label]) => <label className={css.option} key={name}><input type="checkbox" name={name} checked={Boolean(values[name])} onChange={event => change(name, event.target.checked)} />{label}</label>)}</div>
        </details>
        <div className={css.actions}>
          <Button filled type="submit">Search</Button>
          <Button outlined onClick={clear}><BsX size={20} aria-hidden="true" />Clear filters</Button>
        </div>
      </form>
    </aside>
  );
}
