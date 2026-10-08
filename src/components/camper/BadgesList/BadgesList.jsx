import { Badge } from '@components/camper';

import css from './BadgesList.module.css';

export default function BadgesList({ camper, compact = false }) {
  const formNames = {
    panelTruck: 'Panel Van',
    fullyIntegrated: 'Integrated',
    semiIntegrated: 'Semi Integrated',
  };

  let badges = [
    { name: 'transmission', value: camper?.transmission, icon: 0 },
    { name: 'engine', value: camper?.engine, icon: 1 },
    { name: 'AC', value: camper?.AC, icon: 2 },
    { name: 'bathroom', value: camper?.bathroom, icon: 3 },
    { name: 'kitchen', value: camper?.kitchen, icon: 4 },
    { name: 'TV', value: camper?.TV, icon: 5 },
    { name: 'radio', value: camper?.radio, icon: 6 },
    { name: 'refrigerator', value: camper?.refrigerator, icon: 7 },
    { name: 'microwave', value: camper?.microwave, icon: 8 },
    { name: 'gas', value: camper?.gas, icon: 9 },
    { name: 'water', value: camper?.water, icon: 10 },
    { name: 'form', value: camper?.form, icon: 11 },
  ];

  if (compact) {
    badges = [badges[1], badges[0], badges[11]];
  }

  return (
    <ul className={css.badges}>
      {badges.map(badge => {
        let label;

        if (badge.value === true) {
          label = badge.name;
        } else if (typeof badge.value === 'string' && badge.value !== '') {
          label = formNames[badge.value] || badge.value;
        } else {
          return null;
        }

        return <Badge name={label} iconType={badge.icon} key={badge.name} />;
      })}
    </ul>
  );
}
