import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AddStationForm from "./AddStationForm";
import createSelectors from "../../../store/createSelectors";
import appStateStore from "../../../store/CommonStore/appStateStore";

const AddStationModal = () => {
  const useAppState = createSelectors(appStateStore);
  const isAddStationModalOpen = useAppState.use.isAddStationModalOpen();
  const setIsAddStationModalOpen = useAppState.use.setIsAddStationModalOpen();

  const handleAddStationModalClose = () => {
    setIsAddStationModalOpen(false);
  };

  return (
    <Modal isOpen={isAddStationModalOpen} onClose={handleAddStationModalClose}>
      <ModalOverlay />
      <ModalContent maxW={"60%"}>
        <ModalHeader>Add EV Station</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddStationForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddStationModal;
