import React, { useState, ChangeEvent, FormEvent } from "react";
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
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const Wallet: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });
  const [focus, setFocus] = useState<string>("");

  const currentBalance = 100; // Example current balance
  const totalSpent = 200; // Example total amount spent

  const handleOrderModalOpen = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalOpen(false);
  };

  const handleAddFundsModalOpen = () => {
    setIsAddFundsModalOpen(true);
  };

  const handleAddFundsModalClose = () => {
    setIsAddFundsModalOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(e.target.name);
  };

  const handleAddFundsSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic for handling the add funds form submission here
    console.log("Card Details:", cardDetails);
    setIsAddFundsModalOpen(false);
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
              number={"500"}
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
      <Flex ml={"55rem"} gap={3}>
        <Button
          mt={6}
          onClick={handleOrderModalOpen}
          textAlign={"center"}
          bg={"accent.100"}
          w={"10rem"}
        >
          Order RFID Card
        </Button>
        <Button
          mt={6}
          onClick={handleAddFundsModalOpen}
          textAlign={"center"}
          bg={"accent.100"}
          w={"10rem"}
        >
          Add funds
        </Button>
      </Flex>

      {/* Modal for ordering RFID card */}
      <Modal isOpen={isOrderModalOpen} onClose={handleOrderModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order RFID Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>
              To get started with your RFID card, please provide your details
              below
            </Text>
            <Input mb={3} placeholder="Full Name" />
            <Input mb={3} placeholder="Email Address" type="email" />
          </ModalBody>
          <ModalFooter>
            <Button bg={"accent.100"} mr={3}>
              Order
            </Button>
            <Button variant="ghost" onClick={handleOrderModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for adding funds */}
      <Modal isOpen={isAddFundsModalOpen} onClose={handleAddFundsModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" onSubmit={handleAddFundsSubmit}>
              <Flex direction="column" align="center">
                <Cards
                  cvc={cardDetails.cvc}
                  expiry={cardDetails.expiry}
                  name={cardDetails.name}
                  number={cardDetails.number}
                  focused={focus as Focused}
                />
                <Input
                  mt={4}
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={16}
                  required
                />
                <Input
                  mt={4}
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={cardDetails.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
                <Input
                  mt={4}
                  type="tel"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={5}
                  required
                />
                <Input
                  mt={4}
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={3}
                  required
                />
                <Button type="submit" mt={4} bg={"accent.100"}>
                  Add Funds
                </Button>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleAddFundsModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Wallet;
