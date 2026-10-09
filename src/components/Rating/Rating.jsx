import { BsStarFill } from 'react-icons/bs';
import clsx from 'clsx';

import css from './Rating.module.css';

const ratingClass = isActive => clsx(css.star, isActive && css.active);
const wrapperClass = place => clsx(css.wrapper, place && 'grid');

export default function Rating({ ratingCount, activeStars, place = false }) {
  return (
    <div className={wrapperClass(place)} role="img" aria-label={`${activeStars} out of ${ratingCount} stars`}>
      {ratingCount > 0 &&
        Array(ratingCount)
          .fill()
          .map((_, idx) => {
            const isActive = activeStars >= idx + 1;
            return (
              <BsStarFill
                className={ratingClass(isActive)}
                size={16}
                key={idx}
              />
            );
          })}
    </div>
  );
}
