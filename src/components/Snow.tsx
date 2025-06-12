import styles from '../styles/snow.module.css';

export const Snow = () => {
  return <div className={styles.snowContainer}>
    {[...Array(50)].map((_, i) => (
      <div key={i} className={styles.snowflake}>❄️</div>
    ))}
  </div>;
};
