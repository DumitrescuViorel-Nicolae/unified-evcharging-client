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

  const useAppStateStore = createSelectors(appStateStore);
  const setIsOpen = useAppStateStore.use.setIsPaymentModalOpen();

  return (
    <Modal size="4xl" onClose={onClose} isCentered isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connector Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <Card mr={4}>
              <CardBody textAlign={"center"}>
                <Datetime
                  value={selectedTime}
                  dateFormat={false}
                  timeFormat="HH:mm"
                  onChange={handleTimeChange}
                />

                <Select value={dayOption} onChange={handleDayOptionChange}>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                </Select>

                <Button
                  w={"15rem"}
                  mt={3}
                  bg={"accent.100"}
                  onClick={() => setIsOpen(true)}
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
