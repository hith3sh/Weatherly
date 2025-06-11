import { BeatLoader } from 'react-spinners';

export const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <BeatLoader
          color="#ffffff"
          loading={true}
          size={15}
          margin={8}
          aria-label="Loading Spinner"
        />
        <p className="loading-text">Loading weather data...</p>
      </div>
    </div>
  );
}; 