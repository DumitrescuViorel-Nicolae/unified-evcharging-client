import { useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  TableContainer,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  ScaleFade,
  AlertDialogFooter,
  Box,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md"; // Import edit and delete icons
import { EVStation } from "../../interfaces/EVStation";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";
import DeleteEVStation from "./StationManagement/DeleteEVStation";
import appStateStore from "../../store/CommonStore/appStateStore";
import AddStationModal from "./StationManagement/AddStation/AddStationModal";

const ManageEVStations = () => {
  const useEVStore = createSelectors(evStationStore);
  const evStations = useEVStore.use.evStations();

  const useAppState = createSelectors(appStateStore);
  const isAddStationModalOpen = useAppState.use.isAddStationModalOpen();
  const setIsAddStationModalOpen = useAppState.use.setIsAddStationModalOpen();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedStation, setSelectedStation] = useState<any>();
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [stationID, setStationID] = useState<number | null>();
  const cancelRef = useRef();
  const [isAlertOpened, setIsAlertOpened] = useState(evStations.length === 0);

  const handleEdit = (station: EVStation) => {
    setSelectedStation(station);
    console.log(selectedStation);
    onOpen();
  };

  const handleDelete = (stationId: number) => {
    setStationID(stationId);
    setIsDeletePopup(true);
  };

  const handleAddStationModalOpen = () => {
    setIsAlertOpened(false);
    setIsAddStationModalOpen(true);
  };

  const handleOpenAlert = () => {
    setIsAddStationModalOpen(true);
  };

  return (
    <>
      {evStations.length === 0 ? (
        <>
          <ScaleFade initialScale={0.9} in={isAlertOpened}>
            <AlertDialog
              isCentered
              isOpen={isAlertOpened}
              leastDestructiveRef={cancelRef}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader m={"0 auto"} fontSize={"md"}>
                    Please add an electric station
                  </AlertDialogHeader>
                  <AlertDialogFooter m={"0 auto"}>
                    <Button
                      width={"140px"}
                      onClick={handleAddStationModalOpen}
                      bg={"accent.100"}
                      mr={2}
                    >
                      Add EV Station
                    </Button>
                    <Button onClick={() => setIsAlertOpened(false)}>
                      Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </ScaleFade>
        </>
      ) : (
        <TableContainer mx={6}>
          <Table variant="striped" colorScheme="green" size="md">
            <Thead>
              <Tr>
                <Th>Brand</Th>
                <Th>Location</Th>
                <Th>Total Connectors</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {evStations.map((station: EVStation) => (
                <Tr key={station.stripeAccountID}>
                  <Td>{station.brand}</Td>
                  <Td>
                    {station.address.street}, {station.address.city},{" "}
                    {station.address.country}
                  </Td>
                  <Td>{station.totalNumberOfConnectors}</Td>
                  <Td>
                    <Button
                      size="sm"
                      leftIcon={<MdEdit />}
                      mr={3}
                      width={"100px"}
                      bg={"primary.600"}
                      onClick={() => handleEdit(station)}
                    >
                      Edit
                    </Button>
                    <Button
                      width={"100px"}
                      size="sm"
                      leftIcon={<MdDelete />}
                      colorScheme="red"
                      onClick={() => handleDelete(station.stationID)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Box m={3}>
            {" "}
            <Button
              hidden={isAlertOpened || isAddStationModalOpen}
              width={"140px"}
              onClick={handleOpenAlert}
              bg={"accent.100"}
            >
              Add EV Station
            </Button>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit EV Station</ModalHeader>
              <ModalBody>
                <FormControl>
                  <FormLabel>Brand</FormLabel>
                  <Input
                    type="text"
                    defaultValue={selectedStation?.brand}
                    onChange={(e) =>
                      setSelectedStation((prevStation) => ({
                        ...prevStation,
                        brand: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Street</FormLabel>
                  <Input
                    type="text"
                    defaultValue={selectedStation?.address.street}
                    onChange={(e) =>
                      setSelectedStation((prevStation) => ({
                        ...prevStation,
                        address: {
                          ...prevStation.address,
                          street: e.target.value,
                        },
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    defaultValue={selectedStation?.address.city}
                    onChange={(e) =>
                      setSelectedStation((prevStation) => ({
                        ...prevStation,
                        address: {
                          ...prevStation.address,
                          city: e.target.value,
                        },
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    defaultValue={selectedStation?.address.country}
                    onChange={(e) =>
                      setSelectedStation((prevStation) => ({
                        ...prevStation,
                        address: {
                          ...prevStation.address,
                          country: e.target.value,
                        },
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Connectors</FormLabel>
                  <Input
                    type="number"
                    defaultValue={selectedStation?.totalNumberOfConnectors}
                    onChange={(e) =>
                      setSelectedStation((prevStation) => ({
                        ...prevStation,
                        totalNumberOfConnectors: parseInt(e.target.value),
                      }))
                    }
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={onClose}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <DeleteEVStation
            isOpen={isDeletePopup}
            onClose={() => setIsDeletePopup(false)}
            stationID={stationID}
          />
        </TableContainer>
      )}

      <AddStationModal />
    </>
  );
};

export default ManageEVStations;
