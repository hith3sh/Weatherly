import React, { useState, useRef } from 'react';

export const MoreInfoPanel = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const distanceDragged = currentY - startY;

    // If dragged down more than 100px, close the panel
    if (distanceDragged > 100) {
      onClose();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={panelRef}
      className={`more-info-panel ${isOpen ? 'open' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="panel-content">
        <div className="panel-header">
          <div className="drag-handle"/>
        </div>
        <h3>More Weather Info</h3>

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