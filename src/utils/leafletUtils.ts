// src/utils/leafletUtils.ts

import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export const createFlagIcon = (countryCode: string) => {
    return new L.Icon({
      iconUrl: `https://flagcdn.com/${countryCode.toLowerCase()}.svg`,
      iconSize: [30,20]
    });
};