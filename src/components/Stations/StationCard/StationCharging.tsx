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
} from "@chakra-ui/react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import moment from "moment";
import appStateStore from "../../../store/CommonStore/appStateStore";
import createSelectors from "../../../store/createSelectors";

const StationCharging = ({ onClose, onOpen, isOpen }) => {
  const [selectedTime, setSelectedTime] = useState(moment());
  const [dayOption, setDayOption] = useState("today");

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

  const useAppStateStore = createSelectors(appStateStore);
  const setIsOpen = useAppStateStore.use.setIsPaymentModalOpen();

  return (
    <Modal size="4xl" onClose={onClose} isCentered isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connector Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center">
            <Card mr={4}>
              <CardBody textAlign={"center"}>
                <Flex alignItems="center">
                  I need my vehicle{" "}
                  <Select
                    value={dayOption}
                    onChange={handleDayOptionChange}
                    mx={2}
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
                    inputProps={{ style: { marginLeft: "10px" } }}
                  />
                </Flex>
                <Button
                  w={"15rem"}
                  mt={3}
                  bg={"accent.100"}
                  onClick={() => {
                    const timeDifference = calculateTimeDifference();
                    console.log(
                      `Time difference in minutes: ${timeDifference}`
                    );
                    setIsOpen(true);
                  }}
                >
                  Start Charging
                </Button>
              </CardBody>
            </Card>
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
