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
  Collapse,
} from "@chakra-ui/react";
import { EVStation } from "../../interfaces/EVStation";
import { useState } from "react";

interface StationCardProps {
  station: EVStation;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  const colorScheme = {
    bg: "black",
    border: "gray.700",
    text: "white",
    badge: "teal",
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
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
        <Stack mt="6" spacing="3">
          <Heading size="md" color={colorScheme.text}>
            {station.brand}
          </Heading>
          <Text color={colorScheme.text}>
            {station.address.street}, {station.address.city},{" "}
            {station.address.country}
          </Text>
          <Text color={colorScheme.text} fontSize="2xl">
            {`Total Connectors: ${station.totalNumberOfConnectors}`}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardBody>
        <Text fontSize="sm" fontWeight="bold" color={colorScheme.text}>
          Connector Details:
        </Text>
        <Button variant="link" onClick={toggleDetails} color={colorScheme.text}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Collapse in={showDetails} animateOpacity>
          {station.connectorDetails.map((connector, index) => (
            <Box key={index} mt={2}>
              <Stack direction="row" align="center">
                <Badge colorScheme={colorScheme.badge}>
                  {connector.supplierName}
                </Badge>
                <Text color={colorScheme.text}>{connector.connectorType}</Text>
              </Stack>
              <Text color={colorScheme.text}>
                Charge Capacity: {connector.chargeCapacity}
              </Text>
              <Text color={colorScheme.text}>
                Max Power Level: {connector.maxPowerLevel}
              </Text>
              <Text color={colorScheme.text}>
                Customer Charge Level: {connector.customerChargeLevel}
              </Text>
              <Text color={colorScheme.text}>
                Customer Connector Name: {connector.customerConnectorName}
              </Text>
            </Box>
          ))}
        </Collapse>
        <Divider />
        <Box className="text-center">
          <Button className="mt-4 mx-auto">Pay</Button>
          <Button className="mt-4 mx-auto ml-2">Navigate</Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default StationCard;
