import {
  Box,
  Container,
  SimpleGrid,
  Button,
  Card,
  Text,
} from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/react";
import { useState } from "react";
import createSelectors from "../../store/createSelectors";
import StationCard from "../Stations/StationCard/StationCard";
import { SlEnergy } from "react-icons/sl";
import { FaRegSadTear } from "react-icons/fa";
import MapDrawer from "../Map/MapDrawer";
import accountStore from "../../store/UserStore/accountStore";

export const LikedLocations = () => {
  const useAccountStore = createSelectors(accountStore);
  const evStations = useAccountStore.use.savedLocations();

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
        {evStations?.length !== 0 ? (
          <SimpleGrid justifyItems={"center"} columns={[1, 4]} spacing={4}>
            {evStations?.map((station) => (
              <StationCard key={Math.random()} station={station} />
            ))}
          </SimpleGrid>
        ) : (
          <Card bg="primary.600" p={8} textAlign="center">
            <Box
              display={"inline-flex"}
              justifyContent={"center"}
              alignItems={"center"}
              mb={3}
            >
              <Text fontSize="xl">No loved EV stations yet! </Text>
              {"   "}
              <FaRegSadTear fontSize={25} />
            </Box>

            <Text mt={2}>
              Why not add some favorites and spread the love for EVs?
            </Text>
          </Card>
        )}
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
