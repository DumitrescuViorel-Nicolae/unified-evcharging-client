import React from "react";
import ReactMapGL from "react-map-gl";

interface MapProps {
  isOpen: boolean;
  onClose: () => void;
}

const Map: React.FC<MapProps> = ({ isOpen, onClose }) => {
  const [viewState, setViewState] = React.useState({
    longitude: 26.102537,
    latitude: 44.426765,
    zoom: 12,
    height: "700px",
    width: "fit",
  });

  return (
    <div style={{ height: "850px" }}>
      <ReactMapGL
        {...viewState}
        mapStyle="mapbox://styles/johnsmith43943/cluy7f6f3000f01pf2zt221vb"
        mapboxAccessToken="pk.eyJ1Ijoiam9obnNtaXRoNDM5NDMiLCJhIjoiY2x1eTZzaDdpMHQ0MTJqbnZ0NXJmMjA0YSJ9.FUs1K2u4wf4nRAXq3y-PlQ"
        onMove={(evt) => setViewState(evt.viewState)}
      />
    </div>
  );
};

export default Map;
