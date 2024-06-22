import { Box, Container, SimpleGrid, Button } from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";
import StationCard from "../Stations/StationCard/StationCard";
import { SlEnergy } from "react-icons/sl";
import MapDrawer from "../Map/MapDrawer";
import accountStore from "../../store/UserStore/accountStore";

export const HomePage = () => {
  // STORES
  const useEVStationStore = createSelectors(evStationStore);

  // USING
  const getEVStations = useEVStationStore.use.getEVStation();
  const evStations = useEVStationStore.use.evStationsToView();
  const useAccountStore = createSelectors(accountStore);
  const userLocation = useAccountStore.use.geolocation();

  // LOCAL STATE
  useMemo(() => {
    getEVStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, getEVStations]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const subtlePulse = keyframes`
0% {
  box-shadow: 0 0 10px #32CD32, 0 0 20px #32CD32, 0 0 30px #32CD32;
}
50% {
  box-shadow: 0 0 20px #32CD32, 0 0 30px #32CD32, 0 0 40px #32CD32;
}
100% {
  box-shadow: 0 0 10px #32CD32, 0 0 20px #32CD32, 0 0 30px #32CD32;
}
`;

  return (
    <Container maxW="150rem" mt={8}>
      <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
        <SimpleGrid justifyItems={"center"} columns={[1, 4]} spacing={4}>
          {evStations.map((station) => (
            <StationCard key={Math.random()} station={station} />
          ))}
        </SimpleGrid>
      </Box>
      {/* <Link to={"/map"}> */}
      <Button
        position="fixed"
        bottom="5rem"
        left="50%"
        transform="translateX(-50%)"
        bg="accent.200"
        zIndex={1000}
        color="complementary.300"
        paddingX={6}
        textAlign={"center"}
        fontWeight="bold"
        borderRadius="md"
        transition="background-color 0.3s ease"
        animation={`${subtlePulse} 2s infinite`}
        _hover={{
          bg: "accent.100",
        }}
        onClick={handleOpenModal}
      >
        <SlEnergy fontSize={20} style={{ marginRight: "8px" }} />
        Map
      </Button>
      {/* </Link> */}

      <MapDrawer isOpen={isOpen} onClose={handleCloseModal} />
    </Container>
  );
};
