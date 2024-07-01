import {
  Box,
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
import { MdOutlineSpeed, MdOutlineEnergySavingsLeaf } from "react-icons/md";
import "react-datetime/css/react-datetime.css";
import { ChangeEvent, useState } from "react";
import moment, { Moment } from "moment";
import appStateStore from "../../../store/CommonStore/appStateStore";
import createSelectors from "../../../store/createSelectors";
import evStationStore from "../../../store/EVStationStore/evStationStore";
import ReportProblemModal from "./ReportProblemModal"; // Import the new component
import accountStore from "../../../store/UserStore/accountStore";
import authStore from "../../../store/UserStore/authStore";

interface StationChargingProps {
  onClose: () => void;
  isOpen: boolean;
}

const StationCharging: React.FC<StationChargingProps> = ({
  onClose,
  isOpen,
}) => {
  const [selectedTime, setSelectedTime] = useState<Moment | string>(moment());
  const [dayOption, setDayOption] = useState("today");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State for the report modal

  const useEVStationStore = createSelectors(evStationStore);
  const useAccountStore = createSelectors(accountStore);
  const selectedDetail = useEVStationStore.use.selectedConnector();
  const setPayment = useAccountStore.use.setPaymentSum();

  const handleTimeChange = (time: Moment | string) => {
    setSelectedTime(time);
  };

  const handleDayOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDayOption(event.target.value);
  };

  const calculateTimeDifference = () => {
    const currentTime = moment();
    const chosenTime = moment(selectedTime);
    if (dayOption === "tomorrow") {
      // handle occupation logic
    }
    const differenceInMinutes = chosenTime.diff(currentTime, "minutes");
    return differenceInMinutes;
  };

  const calculateRangeAdded = () => {
    const chargingPower = selectedDetail?.maxPowerLevel || 0;
    const chargingTime = calculateTimeDifference() / 60;
    const estimatedEnergyConsumtion = 0.186; // kWh/km

    if (chargingTime > 0) {
      const rangeAdded =
        (chargingPower * chargingTime) / estimatedEnergyConsumtion;

      return `${rangeAdded.toFixed(2)} km`;
    } else return `${0} km`;
  };

  const calculatePayment = () => {
    const chargingPower = selectedDetail?.maxPowerLevel || 0;
    const chargingTime = calculateTimeDifference() / 60;

    if (chargingTime > 0) {
      const energyConsumedFromStation = chargingPower * chargingTime;
      setPayment(
        parseFloat(
          (energyConsumedFromStation * (selectedDetail?.price || 0)).toFixed(2)
        )
      );
      return `${energyConsumedFromStation.toFixed(2)} kWh`;
    } else return `${0} kWh`;
  };

  const useAppStateStore = createSelectors(appStateStore);
  const useAuthStore = createSelectors(authStore);

  const isLoggendIn = useAuthStore.use.isLoggedIn();
  const setIsOpen = useAppStateStore.use.setIsPaymentModalOpen();
  const setIsOpenAuth = useAppStateStore.use.setIsAuthModalOpen();

  return (
    <>
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
                        w={"8rem"}
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
                    <Text
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      mb={4}
                      fontSize={"xl"}
                    >
                      Summary
                    </Text>
                    <Flex direction={"column"}>
                      {" "}
                      <Box display={"inline-flex"} alignItems={"center"} mb={3}>
                        <MdOutlineSpeed fontSize={25} className="mr-2" />
                        <Text fontSize={"medium"}>
                          Estimated range added:{" "}
                          <span className="ml-2 font-semibold">
                            {calculateRangeAdded()}
                          </span>
                        </Text>
                      </Box>
                      <Box display={"inline-flex"} alignItems={"center"}>
                        <MdOutlineEnergySavingsLeaf
                          fontSize={25}
                          className="mr-2"
                        />
                        <Text fontSize={"medium"}>
                          Energy consumed:{" "}
                          <span className="ml-2 font-semibold">
                            {calculatePayment()}
                          </span>
                        </Text>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              </Flex>

              <Flex>
                <Button
                  w={"15rem"}
                  mt={10}
                  mr={2}
                  onClick={() => setIsReportModalOpen(true)}
                >
                  Report a problem
                </Button>

                <Button
                  w={"15rem"}
                  mt={10}
                  bg={"accent.100"}
                  onClick={() => {
                    isLoggendIn ? setIsOpen(true) : setIsOpenAuth(true);
                  }}
                >
                  Start Charging
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Report Problem Modal */}
      <ReportProblemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </>
  );
};

export default StationCharging;
