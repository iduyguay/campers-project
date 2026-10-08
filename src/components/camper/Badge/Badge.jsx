import {
  BsWind,
  BsDiagram3,
  BsCupHot,
  BsTv,
  BsDroplet,
  BsUiRadios,
  BsTruck,
} from 'react-icons/bs';
import { FaGasPump, FaHandHoldingWater } from 'react-icons/fa';
import { LuRefrigerator, LuMicrowave } from 'react-icons/lu';
import { PiEngine } from 'react-icons/pi';

import css from './Badge.module.css';

const icons = [
  BsDiagram3,
  PiEngine,
  BsWind,
  BsDroplet,
  BsCupHot,
  BsTv,
  BsUiRadios,
  LuRefrigerator,
  LuMicrowave,
  FaGasPump,
  FaHandHoldingWater,
  BsTruck,
];

export default function Badge({ name, iconType }) {
  const IconComponent = icons[iconType];

  return (
    <li className={css.badge}>
      <IconComponent size={20} />
      <span>{name.slice(0, 1).toUpperCase() + name.slice(1)}</span>
    </li>
  );
}
