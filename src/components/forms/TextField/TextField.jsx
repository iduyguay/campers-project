import { useField } from 'formik';
import { BsExclamationCircle } from 'react-icons/bs';
import clsx from 'clsx';
import css from './TextField.module.css';
export default function TextField({ fieldType = 'text', fieldName, required, label }) {
  const [field, meta] = useField(fieldName);
  const invalid = meta.touched && Boolean(meta.error);

  let autoComplete;

  if (fieldName === 'userName') {
    autoComplete = 'name';
  } else if (fieldType === 'email') {
    autoComplete = 'email';
  }

  return <div>
    <div className={clsx(css.field, invalid && css.invalid)}>
      <label htmlFor={fieldName} className="visuallyHidden">{label}{required && '*'}</label>
      <input
        {...field}
        id={fieldName}
        className={css.input}
        type={fieldType}
        autoComplete={autoComplete}
        placeholder={`${label}${required ? '*' : ''}`}
        required={required}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${fieldName}-error` : undefined}
      />
      {invalid && <BsExclamationCircle className={css.icon} size={20} aria-hidden="true" />}
    </div>
    {invalid && <p id={`${fieldName}-error`} className={css.error}>{meta.error}</p>}
  </div>;
}
