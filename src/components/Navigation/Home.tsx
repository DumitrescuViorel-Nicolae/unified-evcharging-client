import { Box, Container, SimpleGrid, Button } from "@chakra-ui/react";
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
  const evStations = useEVStationStore.use.evStations();
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

  return (
    <Container maxW="100rem" mt={8}>
      <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
        <SimpleGrid justifyItems={"center"} columns={[1, 3]} spacing={4}>
          {evStations.map((station) => (
            <StationCard key={Math.random()} station={station} />
          ))}
        </SimpleGrid>
      </Box>
      <Button
        position="fixed"
        top="60%"
        right="90%"
        width={"120px"}
        transform="translateX(-50%)"
        bg="accent.200"
        zIndex={1000}
        color="complementary.300"
        paddingX={6}
        textAlign={"center"}
        fontWeight="bold"
        borderRadius="md"
        boxShadow="md"
        transition="background-color 0.3s ease"
        _hover={{
          bg: "accent.100",
        }}
        onClick={handleOpenModal}
      >
        <SlEnergy fontSize={20} style={{ marginRight: "8px" }} />
        Map
      </Button>

      <Button
        position="fixed"
        top="60%"
        right="-1%"
        width={"120px"}
        transform="translateX(-50%)"
        bg="accent.200"
        zIndex={1000}
        color="complementary.300"
        paddingX={6}
        textAlign={"center"}
        fontWeight="bold"
        borderRadius="md"
        boxShadow="md"
        transition="background-color 0.3s ease"
        _hover={{
          bg: "accent.100",
        }}
        onClick={handleOpenModal}
      >
        <SlEnergy fontSize={20} style={{ marginRight: "8px" }} />
        Wallet
      </Button>
      <MapDrawer isOpen={isOpen} onClose={handleCloseModal} />
    </Container>
  );
};
