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
  Spacer,
} from "@chakra-ui/react";
import { EVStation } from "../../interfaces/EVStation";
import React from "react";
import createSelectors from "../../store/createSelectors";
import appStateStore from "../../store/CommonStore/appStateStore";
import CheckoutForm from "./StationsPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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

  const useAppStateStore = createSelectors(appStateStore);
  const setIsOpen = useAppStateStore.use.setIsPaymentModalOpen();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_ACCESS_TOKEN);

  const onPay = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Card
        maxW="sm"
        bg={colorScheme.bg}
        border="1px"
        borderColor={colorScheme.border}
      >
        <CardBody>
          <Image
            src={import.meta.env.VITE_PLACEHOLDER_IMAGE}
            alt="Station Image"
            borderRadius="lg"
          />
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
              <Spacer className="m-2" />
            </Stack>
          </Flex>
          <Flex justify={"space-between"}>
            <Button onClick={onOpen} textAlign={"center"} fontSize={"sm"}>
              Details
            </Button>
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
              Pay
            </Button>
            <Button bg={"accent.100"} className="mt-4 mx-auto ml-2">
              Navigate
            </Button>
          </Box>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connector Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {station.connectorDetails.map((connector, index) => (
              <Box key={index} mt={2}>
                <Stack direction="row" align="center">
                  <Badge colorScheme={colorScheme.badge}>
                    {connector.supplierName}
                  </Badge>
                  <Text>{connector.connectorType} Socket</Text>
                </Stack>
                <Text>Charge Capacity: {connector.chargeCapacity}</Text>
                <Text>Max Power Level: {connector.maxPowerLevel}kW</Text>
                <Text my={2} fontWeight={"bold"}>
                  Price: {connector.price} RON/kWh
                </Text>
                {index < station.connectorDetails.length - 1 && (
                  <Divider mt={4} />
                )}
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
          amount={2}
        />
      </Elements>
    </>
  );
};

export default StationCard;
