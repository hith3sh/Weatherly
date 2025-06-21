'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card } from '../shared/Card';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const useIsDark = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

interface WeatherMapProps {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ location }) => {
  const position: [number, number] = [location.lat, location.lon];
  const isDark = useIsDark();

  const lightTile = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  };

  const darkTile = {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  };

  const tileLayer = isDark ? darkTile : lightTile;

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Weather Map
      </h2>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <MapUpdater center={position} zoom={10} />
          <TileLayer
            key={tileLayer.url}
            attribution={tileLayer.attribution}
            url={tileLayer.url}
          />
          <Marker position={position}>
            <Popup>
              {location.name}, {location.country}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Card>
  );
}; 