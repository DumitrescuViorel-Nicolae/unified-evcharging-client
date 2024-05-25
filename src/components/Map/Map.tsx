import React from "react";
import ReactMapGL from "react-map-gl";

interface MapProps {
  isOpen: boolean;
  onClose: () => void;
}

const Map: React.FC<MapProps> = ({ isOpen, onClose }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/johnsmith43943/cluy7f6f3000f01pf2zt221vb"
      mapboxApiAccessToken={
        "pk.eyJ1Ijoiam9obnNtaXRoNDM5NDMiLCJhIjoiY2x1eTZzaDdpMHQ0MTJqbnZ0NXJmMjA0YSJ9.FUs1K2u4wf4nRAXq3y-PlQ"
      }
      mapboxAccessToken="pk.eyJ1Ijoiam9obnNtaXRoNDM5NDMiLCJhIjoiY2x1eTZzaDdpMHQ0MTJqbnZ0NXJmMjA0YSJ9.FUs1K2u4wf4nRAXq3y-PlQ"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
};

export default Map;
