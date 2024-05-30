import { useState } from "react";
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
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md"; // Import edit and delete icons
import { EVStation } from "../../interfaces/EVStation";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";
import AddStationForm from "./AddStationForm";
import DeleteEVStation from "./DeleteEVStation";

const ManageEVStations = () => {
  const useEVStore = createSelectors(evStationStore);
  const evStations = useEVStore.use.evStations();
  const deleteEVStation = useEVStore.use.deleteEVStation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStation, setSelectedStation] = useState();
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [stationID, setStationID] = useState();

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
    setIsAddStationModalOpen(true);
  };

  const handleAddStationModalClose = () => {
    setIsAddStationModalOpen(false);
  };

  return (
    <>
      {evStations.length === 0 ? (
        <>
          <Button onClick={handleAddStationModalOpen}>Add EV Station</Button>
          <Modal
            isOpen={isAddStationModalOpen}
            onClose={handleAddStationModalClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add EV Station</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Render the form component for adding a new station */}
                <AddStationForm onClose={handleAddStationModalClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
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
                      onClick={() => handleEdit(station)}
                    >
                      Edit
                    </Button>
                    <Button
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
    </>
  );
};

export default ManageEVStations;
