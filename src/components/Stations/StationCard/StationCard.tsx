import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Box,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { EVStation } from "../../../interfaces/EVStation";
import React, { useEffect, useState } from "react";
import createSelectors from "../../../store/createSelectors";
import CheckoutForm from "./StationsPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ConnectorStatus from "./ConnectorStatus";
import accountStore from "../../../store/UserStore/accountStore";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface StationCardProps {
  station: EVStation;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  const colorScheme = {
    bg: "complementary.300",
    border: "gray.700",
    text: "white",
    badge: "teal",
  };

  const useAccountStore = createSelectors(accountStore);
  const userLocation = useAccountStore.use.geolocation();
  const saveToLocalStorage = useAccountStore.use.saveFavoriteLocation();
  const savedLocations = useAccountStore.use.savedLocations();
  const amount = useAccountStore.use.paymentSum();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_ACCESS_TOKEN);

  const [liked, setLiked] = useState<boolean | undefined>(false); // State to track if station is liked

  const toggleLiked = () => {
    setLiked(!liked);
    saveToLocalStorage(station);
  };

  useEffect(() => {
    // Check if the station is in savedLocations to determine if it's liked
    const isLiked = savedLocations?.some(
      (savedStation) => savedStation.stationID === station.stationID
    );
    setLiked(isLiked);
  }, [savedLocations, station]);

  const onPay = () => {
    onOpen();
  };

  return (
    <>
      <Card
        maxW="sm"
        bg={colorScheme.bg}
        border="1px"
        borderColor={colorScheme.border}
        position="relative" // Ensure the card is relatively positioned
      >
        <Box position="absolute" top="0" right="0">
          <Button p={0} onClick={toggleLiked} bg={"accent.100"}>
            {liked ? (
              <FaHeart fontSize={30} />
            ) : (
              <CiHeart color="primary.600" fontSize={40} />
            )}
          </Button>
        </Box>
        <CardBody>
          <Flex justify="space-between" align="center">
            <Image
              src={import.meta.env.VITE_PLACEHOLDER_IMAGE}
              alt="Station Image"
              borderRadius="lg"
            />
          </Flex>
          <Flex mt="6" justify="space-between" align="flex-start">
            <Heading size="md" color={colorScheme.text}>
              {station.brand}
            </Heading>

            <Stack spacing="1" textAlign="right">
              <Text color={colorScheme.text} fontSize="md">
                {station.address.street}, {station.address.city}
              </Text>
              <Text color={colorScheme.text} fontSize="md">
                {`${station.totalNumberOfConnectors}/${station.totalNumberOfConnectors}`}{" "}
                Connectors
              </Text>
            </Stack>
          </Flex>
          <Flex justify={"space-between"}>
            <Text color={colorScheme.text} fontSize="sm">
              {station.distance}km away
            </Text>
          </Flex>
        </CardBody>
        <Divider />
        <CardBody>
          <Box className="text-center">
            <Button
              onClick={() => onPay()}
              bg={"accent.100"}
              className="mt-4 mx-auto"
            >
              Select
            </Button>
            <Button bg={"accent.100"} className="mt-4 mx-auto ml-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation?.latitude},${userLocation?.longitude}&destination=${station.position.latitude},${station.position.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate
              </a>
            </Button>
          </Box>
        </CardBody>
      </Card>

      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent bg={"complementary.300"} textColor={"primary.600"}>
          <ModalHeader>Connector Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {station.connectorDetails.map((connector, index) => (
              <Box key={index}>
                <Box mt={2}>
                  <Stack direction="row" align="center">
                    <Badge colorScheme={colorScheme.badge}>
                      {connector.supplierName}
                    </Badge>
                    <Text>{connector.connectorType} Socket</Text>
                  </Stack>
                  <Text>
                    {connector.chargeCapacity}V, {connector.maxPowerLevel}kW{" "}
                  </Text>
                  <Text></Text>
                  <Text my={2} fontWeight={"bold"}>
                    Price: {connector.price} RON/kWh
                  </Text>
                  {index < station.connectorDetails.length - 1 && (
                    <Divider mt={4} />
                  )}
                </Box>
                <Grid templateColumns={"repeat(3, 1fr)"}>
                  {connector.connectorsStatuses?.map((status) => (
                    <ConnectorStatus details={connector} status={status} />
                  ))}
                </Grid>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          evStationStripeAccountId={station.stripeAccountID}
          amount={amount}
        />
      </Elements>
    </>
  );
};

export default StationCard;
