import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Select,
  VStack,
} from "@chakra-ui/react";

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [problemType, setProblemType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleProblemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProblemType(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProblemDescription(e.target.value);
  };

  const handleSubmit = () => {
    // handle form submission
    console.log("Problem Type:", problemType);
    console.log("Problem Description:", problemDescription);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report a Problem</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Select
              placeholder="Select problem type"
              value={problemType}
              onChange={handleProblemTypeChange}
            >
              <option value="connector_issue">Connector Issue</option>
              <option value="charging_issue">Charging Issue</option>
              <option value="payment_issue">Payment Issue</option>
              <option value="other">Other</option>
            </Select>
            <Textarea
              placeholder="Describe the problem..."
              value={problemDescription}
              onChange={handleDescriptionChange}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button bg={"accent.100"} mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportProblemModal;
