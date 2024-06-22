import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import {
  ConnectorDetail,
  ConnectorStatus,
} from "../../../interfaces/EVStation";
import StationCharging from "./StationCharging";
import createSelectors from "../../../store/createSelectors";
import evStationStore from "../../../store/EVStationStore/evStationStore";

interface ConnectorStatusProps {
  status: ConnectorStatus;
  details: ConnectorDetail;
}
const ConnectorStatusComponent: React.FC<ConnectorStatusProps> = ({
  status,
  details,
}) => {
  const useEVStationStore = createSelectors(evStationStore);
  const setSelectedConnector = useEVStationStore.use.setSelectedConnector();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const interpretStatus = (state: string) => {
    switch (state) {
      case "AVAILABLE":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            {" "}
            <Text
              fontWeight={"bold"}
              textAlign={"center"}
              textColor={"#1CB722"}
            >
              Status: Available
            </Text>
            <Button
              onClick={() => {
                onOpen();
                setSelectedConnector(details);
              }}
              justifyContent={"center"}
              my={2}
              bg={"accent.100"}
            >
              Select
            </Button>
          </Flex>
        );
      case "OCCUPIED":
        return (
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Text
              fontWeight={"bold"}
              textAlign={"center"}
              textColor={"#FB1C1C"}
            >
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
            <Text
              fontWeight={"bold"}
              textColor={"#B3BF1C"}
              textAlign={"center"}
            >
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
    <>
      <Box px={2} py={1} borderWidth="1px" borderRadius="lg" shadow="md" m={2}>
        <Text textAlign={"center"}>
          Charge point: {status.physicalReference}
        </Text>
        {interpretStatus(status.state)}
      </Box>
      <StationCharging isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ConnectorStatusComponent;
