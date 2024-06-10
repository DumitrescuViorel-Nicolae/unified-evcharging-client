import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ConnectorStatus } from "../../interfaces/EVStation";

interface ConnectorStatusProps {
  status: ConnectorStatus;
}
const ConnectorStatusComponent: React.FC<ConnectorStatusProps> = ({
  status,
}) => {
  const interpretStatus = (state: string) => {
    switch (state) {
      case "AVAILABLE":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            {" "}
            <Text textColor={"#1CB722"}>Status: Available</Text>
            <Button justifyContent={"center"} mt={2} bg={"accent.100"}>
              Select
            </Button>
          </Flex>
        );
      case "OCCUPIED":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Text textColor={"#FB1C1C"}>Status: Occupied</Text>
            <Button mt={2} disabled>
              Notify me
            </Button>
          </Flex>
        );

      case "OUT_OF_SERVICE":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Text>Status: Out of service</Text>
            <Button mt={2} disabled>
              Notify me
            </Button>
          </Flex>
        );

      default:
        break;
    }
  };

  return (
    <Box m={3}>
      <Text>Charge point: {status.physicalReference}</Text>
      {interpretStatus(status.state)}
    </Box>
  );
};

export default ConnectorStatusComponent;
