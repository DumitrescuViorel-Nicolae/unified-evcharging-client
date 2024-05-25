import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Map from "./Map";

const MapModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Map</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Map isOpen={isOpen} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
