// src/utils/leafletUtils.ts

import L from 'leaflet';
import { useModifiedSvg } from '../hooks/useModifiedSvg';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export const createFlagIcon = (countryCode: string, riskScore: number, isDashboard: boolean) => {
    const svgUrl = `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`;
    const modifiedSvgUrl = useModifiedSvg(svgUrl, riskScore);
    // const iconSize = 
    if (!modifiedSvgUrl || riskScore < 0) {
      return new L.Icon({
        iconUrl: `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`,
        iconSize: [40,30]
      });
    }

    return new L.Icon({
      // iconUrl: `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`,
      // iconUrl: `https://flagcdn.com/${countryCode.toLowerCase()}.svg`,
      iconUrl: modifiedSvgUrl,
      iconSize: isDashboard ? [52,39] : [52,39]
    });
};