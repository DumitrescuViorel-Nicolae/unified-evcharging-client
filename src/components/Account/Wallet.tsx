import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  Divider,
  Flex,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const Wallet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentBalance = 500; // Example current balance
  const totalSpent = 200; // Example total amount spent

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="xl">
      <Heading size="md" mb={4} textAlign="center">
        Digital Wallet
      </Heading>
      <Divider mb={4} />
      <Flex justify="space-between" align="center">
        <Box ml={"20rem"} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Current Balance
          </Text>
          <Text fontSize="2xl" color="teal.500">
            ${currentBalance.toFixed(2)}
          </Text>
          <Box mt={4}>
            <Cards
              cvc=""
              expiry=""
              name="Your Wallet"
              number={currentBalance.toString()}
              focused=""
            />
          </Box>
        </Box>
        <Box textAlign="center" mr={"30rem"}>
          <Stat fontSize="2xl">
            <StatLabel fontSize="2xl">Total spent</StatLabel>
            <StatNumber fontSize="2xl">$20</StatNumber>
            <StatHelpText fontSize="xl">Feb 12 - Feb 28</StatHelpText>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>
      </Flex>
      <Button
        mt={6}
        onClick={handleModalOpen}
        textAlign={"center"}
        bg={"accent.100"}
        w={"10rem"}
        ml={"60rem"}
      >
        Order RFID Card
      </Button>

      {/* Modal for ordering RFID card */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order RFID Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>
              To get started with your RFID card, please provide your details
              below
            </Text>
            {/* Example input fields */}
            <Input mb={3} placeholder="Full Name" />
            <Input mb={3} placeholder="Email Address" type="email" />
          </ModalBody>

          <ModalFooter>
            <Button bg={"accent.100"} mr={3}>
              Order
            </Button>
            <Button variant="ghost" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Wallet;
