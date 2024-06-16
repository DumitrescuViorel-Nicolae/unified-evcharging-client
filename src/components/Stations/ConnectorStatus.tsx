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
            <Text textAlign={"center"} textColor={"#1CB722"}>
              Status: Available
            </Text>
            <Button justifyContent={"center"} my={2} bg={"accent.100"}>
              Select
            </Button>
          </Flex>
        );
      case "OCCUPIED":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Text textAlign={"center"} textColor={"#FB1C1C"}>
              Status: Occupied
            </Text>
            <Button my={2} isDisabled={true}>
              Select
            </Button>
          </Flex>
        );

      case "OUT_OF_SERVICE":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Text textColor={"#B3BF1C"} textAlign={"center"}>
              Status: Out of service
            </Text>
            <Button my={2} isDisabled={true}>
              Select
            </Button>
          </Flex>
        );

      default:
        break;
    }
  };

  return (
    <Box px={2} py={1} borderWidth="1px" borderRadius="lg" shadow="md" m={2}>
      <Text textAlign={"center"}>Charge point: {status.physicalReference}</Text>
      {interpretStatus(status.state)}
    </Box>
  );
};

export default ConnectorStatusComponent;
