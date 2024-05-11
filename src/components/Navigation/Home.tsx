import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";
import StationCard from "../Stations/StationCard";

export const HomePage = () => {
  // STORES
  const useEVStationStore = createSelectors(evStationStore);

  // USING
  const getEVStations = useEVStationStore.use.getEVStation();
  const evStations = useEVStationStore.use.evStations();

  useEffect(() => {
    getEVStations();
  }, []);

  return (
    <Container maxW="1100px" mt={8}>
      <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
        <SimpleGrid justifyItems={"center"} columns={[1, 2]} spacing={4}>
          {evStations.map((station) => (
            <StationCard key={Math.random()} station={station} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};
