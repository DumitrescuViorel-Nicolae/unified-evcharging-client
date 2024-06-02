import { useState, useMemo } from "react";
import ReactMapGL, { Marker, Source, Layer, Popup } from "react-map-gl";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";
import { FaChargingStation } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { EVStation } from "../../interfaces/EVStation";
import { Coordinates } from "../../interfaces/Coordinates";

// //NEED to refactor
// const getDirections = async (start: Coordinates, end: Coordinates) => {
//   const response = await fetch(
//     `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=pk.eyJ1Ijoiam9obnNtaXRoNDM5NDMiLCJhIjoiY2x1eTZzaDdpMHQ0MTJqbnZ0NXJmMjA0YSJ9.FUs1K2u4wf4nRAXq3y-PlQ`
//   );
//   const data = await response.json();
//   return data.routes[0].geometry;
// };

const MapGL = () => {
  const useEvStore = createSelectors(evStationStore);
  const evStations = useEvStore.use.evStations();
  const getDirections = useEvStore.use.getDirectionToStation();
  const directions = useEvStore.use.directions();

  const [viewState, setViewState] = useState({
    longitude: 26.0999,
    latitude: 44.4362,
    zoom: 13,
  });

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [selectedStation, setSelectedStation] = useState<EVStation | null>(
    null
  );

  // Get user's current location
  useMemo(() => {
    const handleLocationSuccess = (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setViewState((prevState) => ({
        ...prevState,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    };

    const handleLocationError = (error: GeolocationPositionError) => {
      console.error("Error getting user location:", error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        { enableHighAccuracy: true }
      );
    }
  }, [evStations]);

  const handleMarkerClick = (station: EVStation) => {
    if (userLocation) {
      getDirections(userLocation, station.position).then((data) =>
        console.log(data)
      );
      setViewState({
        ...viewState,
        longitude: station.position.longitude,
        latitude: station.position.latitude,
        zoom: 14,
      });
    }
    setSelectedStation(station);
  };

  const evStationsMarkers = useMemo(
    () =>
      evStations.map((station, index) => (
        <Marker
          longitude={station.position.longitude}
          latitude={station.position.latitude}
          key={index}
        >
          <FaChargingStation
            className="cursor-pointer text-3xl animate-bounce"
            color="##90ee90"
            style={{ marginRight: "8px" }}
            onClick={() => handleMarkerClick(station)}
          />
        </Marker>
      )),
    [evStations]
  );

  return (
    <Box mt={4} bg={"complementary.300"}>
      <ReactMapGL
        style={{ width: "95vw", height: "95vh", margin: "0 auto" }}
        {...viewState}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(e) => setViewState(e.viewState)}
      >
        {evStationsMarkers}
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
          >
            <div style={{ color: "blue" }}>
              You are here <GiPositionMarker className="text-3xl" />
            </div>
          </Marker>
        )}
        {directions && (
          <Source id="route" type="geojson" data={directions}>
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#888",
                "line-width": 8,
              }}
            />
          </Source>
        )}
        {selectedStation && (
          <Popup
            longitude={selectedStation.position.longitude}
            latitude={selectedStation.position.latitude}
            closeButton={true}
            closeOnClick={true}
            style={{ width: "300px", height: "500px" }}
            onClose={() => setSelectedStation(null)}
            anchor="top"
          >
            <div>
              <Text className="text-2xl">{selectedStation.brand}</Text>
              <Divider />
              <Text className="text-lg">{selectedStation.address.street}</Text>
              <Button size="sm" bg={"accent.100"}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${selectedStation.position.latitude},${selectedStation.position.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Navigate with Google Maps
                </a>
              </Button>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  );
};

export default MapGL;
