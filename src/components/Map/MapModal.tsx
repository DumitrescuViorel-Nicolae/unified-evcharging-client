import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import MapGL from "./Map";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ width: "100%", height: "80vh" }}>
            <MapGL />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
