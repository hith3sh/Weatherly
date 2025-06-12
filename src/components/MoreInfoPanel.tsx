import React from 'react';

export const MoreInfoPanel = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}) => {
  return (
    <div className={`more-info-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-content">
        <div className="panel-header">
          <h3>More Weather Info</h3>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>

        <div className="panel-grid">
          <div>Feels like: {data.feelslike_c}°C</div>
          <div>Chance of Rain: {data.precip_mm} mm</div>
          <div>Visibility: {data.vis_km} km</div>
          <div>Pressure: {data.pressure_mb} hPa</div>
          <div>Sunrise: {data.sunrise}</div>
          <div>Sunset: {data.sunset}</div>
        </div>
      </div>
    </div>
  );
};
