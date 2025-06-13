export const Rain = () => {
  return (
    <div className="rain">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className={`drop drop${i % 10}`}></div>
      ))}
    </div>
  );
};