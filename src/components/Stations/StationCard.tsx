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
} from "@chakra-ui/react";
import { EVStation } from "../../interfaces/EVStation";
import React from "react";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onPay = (stripeId: string | null) => {
    console.log(stripeId);
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
            src="https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Station Image"
            borderRadius="lg"
          />
          <Flex mt="6" justify="space-between" align="flex-start">
            <Heading size="md" color={colorScheme.text}>
              {station.brand}
            </Heading>

            <Stack spacing="1" textAlign="right">
              <Text color={colorScheme.text} fontSize="md">
                {station.address.street}, {station.address.city},{" "}
                {station.address.country}
              </Text>
              <Text color={colorScheme.text} fontSize="md">
                {`${station.totalNumberOfConnectors}/${station.totalNumberOfConnectors}`}{" "}
                Connectors
              </Text>
            </Stack>
          </Flex>
          <Button onClick={onOpen} textAlign={"center"} fontSize={"sm"}>
            Details
          </Button>
        </CardBody>
        <Divider />
        <CardBody>
          <Box className="text-center">
            <Button
              onClick={() => onPay(station.stripeAccountID)}
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
                  <Text>{connector.connectorType}</Text>
                </Stack>
                <Text>Charge Capacity: {connector.chargeCapacity}</Text>
                <Text>Max Power Level: {connector.maxPowerLevel}</Text>
                <Text>
                  Customer Charge Level: {connector.customerChargeLevel}
                </Text>
                <Text>
                  Customer Connector Name: {connector.customerConnectorName}
                </Text>
                {index < station.connectorDetails.length - 1 && (
                  <Divider mt={2} />
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
    </>
  );
};

export default StationCard;
