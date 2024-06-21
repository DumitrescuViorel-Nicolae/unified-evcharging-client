import {
  Button,
  Card,
  CardBody,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import moment from "moment";
import appStateStore from "../../../store/CommonStore/appStateStore";
import createSelectors from "../../../store/createSelectors";
import evStationStore from "../../../store/EVStationStore/evStationStore";

interface StationChargingProps {
  onClose: () => void; // Add a type annotation for onClose
  onOpen: () => void;
  isOpen: boolean;
}

const StationCharging: React.FC<StationChargingProps> = ({
  onClose,
  onOpen,
  isOpen,
}) => {
  const [selectedTime, setSelectedTime] = useState(moment());
  const [dayOption, setDayOption] = useState("today");

  const useEVStationStore = createSelectors(evStationStore);
  const selectedDetail = useEVStationStore.use.selectedConnector();

  console.log("first", selectedDetail);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDayOptionChange = (event) => {
    setDayOption(event.target.value);
  };

  const calculateTimeDifference = () => {
    const currentTime = moment();
    const chosenTime = moment(selectedTime);
    if (dayOption === "tomorrow") {
      chosenTime.add(1, "days");
    }
    const differenceInMinutes = chosenTime.diff(currentTime, "minutes");
    return differenceInMinutes;
  };

  const calculatePayment = () => {};

  const useAppStateStore = createSelectors(appStateStore);
  const setIsOpen = useAppStateStore.use.setIsPaymentModalOpen();

  return (
    <Modal size="4xl" onClose={onClose} isCentered isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connector Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Flex alignItems="center">
              <Card mr={4}>
                <CardBody textAlign={"center"}>
                  <Flex alignItems="center">
                    <Text w={"9rem"}> I need my vehicle </Text>
                    <Select
                      value={dayOption}
                      onChange={handleDayOptionChange}
                      mx={2}
                      w={"7rem"}
                    >
                      <option value="today">today</option>
                      <option value="tomorrow">tomorrow</option>
                    </Select>{" "}
                    at{" "}
                    <Datetime
                      value={selectedTime}
                      dateFormat={false}
                      timeFormat="HH:mm"
                      onChange={handleTimeChange}
                      inputProps={{
                        style: { marginLeft: "10px", width: "5rem" },
                      }}
                    />
                  </Flex>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Text fontSize={"xl"}>Summary</Text>
                  <Text fontSize={"medium"}>{selectedDetail?.price}</Text>
                </CardBody>
              </Card>
            </Flex>
            <Button
              w={"15rem"}
              mt={3}
              bg={"accent.100"}
              onClick={() => {
                const timeDifference = calculateTimeDifference();
                console.log(`Time difference in minutes: ${timeDifference}`);
                setIsOpen(true);
              }}
            >
              Start Charging
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StationCharging;
