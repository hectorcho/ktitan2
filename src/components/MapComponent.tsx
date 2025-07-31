// src/components/MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMapDialog } from "../hooks/useMapDialog";
import { Dialog, Typography, AppBar, Toolbar, IconButton, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../theme";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Import utilities and data that MapComponent needs
import { createFlagIcon } from "../utils/leafletUtils";
import { countries } from "../data/countryList";
import type { Country } from "../types/interfaces"; // Ensure City interface is available

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
  dialogIsLoading,
  dialogLoadingError,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <IconButton
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
          >
            {selectedCountry?.name}
          </Typography>

        </Toolbar>
      </AppBar>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {dialogContent}
      </ReactMarkdown>
    </Dialog>
  );
};

// Define the props interface for MapComponent
interface MapComponentProps {
  initialPosition: [number, number];
  zoomLevel: number;
  // onMarkerClick: (country: Country) => void; // A function passed from parent to handle marker clicks
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialPosition,
  zoomLevel,
}) => {
  const {
    openDialog,
    selectedCountry,
    dialogContent,
    dialogIsLoading,
    dialogLoadingError,
    handleOpenDialog,
    handleCloseDialog,
  } = useMapDialog();

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
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Loop through cities data to add markers */}
        {countries.map((country) => (
          <Marker
            key={country.id}
            position={country.position}
            icon={createFlagIcon(country.code)}
            eventHandlers={{
              click: () => {
                handleOpenDialog(country); // Call the prop function on click
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
