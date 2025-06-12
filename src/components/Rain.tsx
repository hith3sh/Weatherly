import React from 'react';
import styles from '../styles/rain.module.css';

export const Rain = () => {
  return (
    <div className={styles.rain}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className={`${styles.drop} ${styles[`drop${i % 10}`]}`}></div>
      ))}
    </div>
  );
};