import css from './LoadingOverlay.module.css';
export default function LoadingOverlay() {
  return <div className={css.overlay} role="status" aria-live="polite">
    <div className={css.panel}><span className={css.spinner} aria-hidden="true" /><h2>Loading trucks...</h2><p>Please wait while we fetch the best<br />travel trucks for you</p></div>
  </div>;
}
