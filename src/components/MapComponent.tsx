// src/components/MapComponent.tsx
import React, { type JSX } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMapDialog } from "../hooks/useMapDialog";
import {
  Dialog,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../theme";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// Import utilities and data that MapComponent needs
// import { countries } from "../data/countryList";
import type { Country } from "../types/interfaces"; // Ensure City interface is available
import { useCountryList } from "../hooks/useMap";
import FlagMarker from "./FlagMarker";

interface MapDialogProps {
  open: boolean;
  onClose: () => void;
  selectedCountry: Country | null;
  dialogContent: string;
  dialogIsLoading: boolean;
  dialogLoadingError: string | null;
}

const MapDialog: React.FC<MapDialogProps> = ({
  open,
  onClose,
  selectedCountry,
  dialogContent,
  // dialogIsLoading,
  // dialogLoadingError,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar
        sx={{ position: "relative", backgroundColor: colors.primary[400] }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
            {selectedCountry?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "30px" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {dialogContent}
        </ReactMarkdown>
      </div>
    </Dialog>
  );
};

// Define the props interface for MapComponent
interface MapComponentProps {
  initialPosition: [number, number];
  zoomLevel: number;
  isDashboard: boolean;
  // onMarkerClick: (country: Country) => void; // A function passed from parent to handle marker clicks
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialPosition,
  zoomLevel,
  isDashboard,
}) => {
  const { data: countries, isLoading, error } = useCountryList();
  const {
    openDialog,
    selectedCountry,
    dialogContent,
    dialogIsLoading,
    dialogLoadingError,
    handleOpenDialog,
    handleCloseDialog,
  } = useMapDialog();

  const majorCountryCodes = [
    "kr",
    "us",
    "jp",
    "tw",
    "ru",
    "fr",
    "gb",
    "kp",
    "cn",
  ];

  let countriesToRender: Country[] = [];
  if (countries) {
    if (isDashboard) {
      countriesToRender = countries.filter((country) =>
        majorCountryCodes.includes(country.code)
      );
    } else {
      countriesToRender = countries;
    }
  }

  // if (isDashboard) {
  //   markersToRender = countries
  //     ? countries
  //         .filter((country) => majorCountryCodes.includes(country.code))
  //         .map((country) => (
  //           <Marker
  //             key={country.id}
  //             position={
  //               country.positionDashboard
  //                 ? country.positionDashboard
  //                 : country.position
  //             }
  //             icon={createFlagIcon(
  //               country.code,
  //               country.riskScore,
  //               isDashboard
  //             )}
  //             eventHandlers={{
  //               click: () => {
  //                 handleOpenDialog(country); // Call the prop function on click
  //               },
  //             }}
  //           ></Marker>
  //         ))
  //     : null;
  // } else {
  //   markersToRender = countries
  //     ? countries.map((country) => (
  //         <Marker
  //           key={country.id}
  //           position={country.position}
  //           icon={createFlagIcon(country.code, country.riskScore, isDashboard)}
  //           eventHandlers={{
  //             click: () => {
  //               handleOpenDialog(country); // Call the prop function on click
  //             },
  //           }}
  //         ></Marker>
  //       ))
  //     : null;
  // }

  return (
    <div className="map-container" style={{ height: "100%", width: "100%" }}>
      <MapDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedCountry={selectedCountry}
        dialogContent={dialogContent}
        dialogIsLoading={dialogIsLoading}
        dialogLoadingError={dialogLoadingError}
      />

      <MapContainer
        center={initialPosition}
        zoom={zoomLevel}
        scrollWheelZoom={isDashboard ? false : true}
        dragging={isDashboard ? false : true}
        doubleClickZoom={isDashboard ? false : true}
        touchZoom={isDashboard ? false : true}
        zoomControl={isDashboard ? false : true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countriesToRender.map((country) => (
          <FlagMarker
            key={country.id}
            country={country}
            isDashboard={isDashboard}
            onMarkerClick={handleOpenDialog}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
