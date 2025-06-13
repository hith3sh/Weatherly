export const Snow = () => {
  return <div className="snowContainer">
    {[...Array(50)].map((_, i) => (
      <div key={i} className="snowflake">❄️</div>
    ))}
  </div>;
};
