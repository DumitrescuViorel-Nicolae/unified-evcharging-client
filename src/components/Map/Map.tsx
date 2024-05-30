import React, { useMemo } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";
import { MdOutlineElectricCar } from "react-icons/md";

const MapGL = () => {
  const useEvStore = createSelectors(evStationStore);
  const evStations = useEvStore.use.evStations();

  // const coordinates = evStations.map((station) => ({
  //   longitude: station.position.longitude,
  //   latidute: station.position.latitude,
  // }));

  //const center = getCenter(coordinates);

  const [viewState, setViewState] = React.useState({
    longitude: 26.0999,
    latitude: 44.4362,
    zoom: 16,
    bearing: 0,
    pitch: 0,
  });

  const evStationsMarkers = useMemo(
    () =>
      evStations.map((station, index) => (
        <Marker
          longitude={station.position.longitude}
          latitude={station.position.latitude}
          key={index}
        >
          <MdOutlineElectricCar
            className="cursor-pointer text-5xl animate-bounce"
            color="green"
            style={{ marginRight: "8px" }}
          />
        </Marker>
      )),
    []
  );

  return (
    <ReactMapGL
      {...viewState}
      mapboxAccessToken="pk.eyJ1Ijoiam9obnNtaXRoNDM5NDMiLCJhIjoiY2x1eTZzaDdpMHQ0MTJqbnZ0NXJmMjA0YSJ9.FUs1K2u4wf4nRAXq3y-PlQ"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewState(e.viewState)}
    >
      {evStationsMarkers}
    </ReactMapGL>
  );
};

export default MapGL;
