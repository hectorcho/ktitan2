// src/hooks/useModifiedSvg.ts

import { useEffect, useState } from "react";

export const useModifiedSvg = (svgUrl: string, riskScore: number) => {
  const [svgDataUrl, setSvgDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(svgUrl);
        const svgText = await response.text();

        let modifiedSvgText = addBarToSvg(svgText, riskScore);

        const dataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          modifiedSvgText
        )}`;

        setSvgDataUrl(dataUrl);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSvg();
  }, [svgUrl]);

  return svgDataUrl;
};

const addBarToSvg = (svgString: string, riskScore: number) => {
  const closingTagIdx = svgString.lastIndexOf("</svg>");
  if (closingTagIdx === -1) {
    return svgString;
  }

  svgString = svgString.replace(
    'viewBox="0 0 640 480"',
    'viewBox="0 0 900 480"'
  );

  const color = getGradientHexColor(riskScore, 100);
  // const height = Math.round(480 * (riskScore / 100.0));
  // const yValue = 480 - height;
  // const newSvgContent = `
  // <g transform="translate(700,0)">
  //   <rect x="0" y="0" width="200" height="480" fill="#eee"/>
  //   <rect x="0" y="${yValue}" width="200" height="${height}" fill="${color}"/>
  //   <text x="60" y="240" font-size="200" font-family="sans-serif" fill="black" text-anchor="middle" dominant-baseline="middle">${riskScore}</text>
  // </g>`;

  const newSvgContent = `
  <g transform="translate(700,0)">
    <circle cx="100" cy="360" r="105" fill="${color}"/>
    <text x="90" y="120" font-size="200" font-family="sans-serif" fill="black" text-anchor="middle" dominant-baseline="middle">${riskScore}</text>
  </g>`;

  return (
    svgString.slice(0, closingTagIdx) +
    newSvgContent +
    svgString.slice(closingTagIdx)
  );
};

function getGradientHexColor(
  step: number,
  totalSteps: number,
  saturation: number = 100,
  lightness: number = 50
): string {
  // Ensure the step is within the valid range
  if (step < 0 || step > totalSteps) {
    throw new Error("Step must be between 0 and totalSteps.");
  }

  // Define the starting (green) and ending (red) hue values
  const startHue = 120; // Green
  const endHue = 0; // Red

  // Calculate the hue for the current step
  const hue = startHue - (step / totalSteps) * (startHue - endHue);

  // Convert HSL to RGB
  // Formulas for HSL to RGB conversion are used here.
  // Note: These helper functions are simplified for clarity but demonstrate the logic.
  const c = (saturation / 100) * (1 - Math.abs(2 * (lightness / 100) - 1));
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness / 100 - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (hue >= 0 && hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hue >= 60 && hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hue >= 120 && hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hue >= 180 && hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hue >= 240 && hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (hue >= 300 && hue < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const R = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  const G = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  const B = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  // Return the hexadecimal color string
  return `#${R}${G}${B}`;
}
