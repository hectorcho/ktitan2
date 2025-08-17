// src/components/FlagMarker.tsx
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useModifiedSvg } from '../hooks/useModifiedSvg';
import type { Country } from '../types/interfaces';

interface FlagMarkerProps {
  country: Country;
  isDashboard: boolean;
  onMarkerClick: (country: Country) => void;
}

const FlagMarker: React.FC<FlagMarkerProps> = ({ country, isDashboard, onMarkerClick }) => {
  // Call the Hook at the top level of this new component
  const modifiedSvgUrl = useModifiedSvg(
    `https://flagicons.lipis.dev/flags/4x3/${country.code.toLowerCase()}.svg`,
    country.riskScore
  );

  const icon = modifiedSvgUrl ? new L.Icon({
    iconUrl: modifiedSvgUrl,
    iconSize: isDashboard ? [52, 39] : [52, 39],
  }) : new L.Icon({
    iconUrl: `https://flagicons.lipis.dev/flags/4x3/${country.code.toLowerCase()}.svg`,
    iconSize: [40, 30],
  });

  return (
    <Marker
      key={country.id}
      position={isDashboard ? (country.positionDashboard || country.position) : country.position}
      icon={icon}
      eventHandlers={{
        click: () => onMarkerClick(country),
      }}
    />
  );
};

export default FlagMarker;