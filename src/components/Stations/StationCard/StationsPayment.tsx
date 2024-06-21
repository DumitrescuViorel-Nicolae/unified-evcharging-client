import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Stack,
  Input,
} from "@chakra-ui/react";
import appStateStore from "../../../store/CommonStore/appStateStore";
import createSelectors from "../../../store/createSelectors";
import "react-credit-cards/es/styles-compiled.css";
import Cards, { Focused } from "react-credit-cards";
import evStationStore from "../../../store/EVStationStore/evStationStore";

interface CheckoutFormProps {
  amount: number;
  evStationStripeAccountId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  evStationStripeAccountId,
}) => {
  const useAppStateStore = createSelectors(appStateStore);
  const useEvStationStore = createSelectors(evStationStore);

  const setIsOpen = useAppStateStore.use.setIsPaymentModalOpen();
  const isOpen = useAppStateStore.use.isPaymentModalOpen();
  const processPayment = useEvStationStore.use.makePayment();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });
  const [focus, setFocus] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(e.target.name);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simplified validation, you may want to perform more thorough validation
    if (
      !cardDetails.number ||
      !cardDetails.expiry ||
      !cardDetails.cvc ||
      !cardDetails.name
    ) {
      alert("Please fill in all card details.");
      return;
    }
    processPayment(evStationStripeAccountId);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay bg={"rgba(0, 0, 0, 0.15)"} />
      <ModalContent>
        <ModalHeader>Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
            <Stack direction="row">
              <Radio value="card">Card</Radio>
              {/* Add other payment options here */}
            </Stack>
          </RadioGroup>

          {paymentMethod === "card" && (
            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Cards
                  cvc={cardDetails.cvc}
                  expiry={cardDetails.expiry}
                  name={cardDetails.name}
                  number={cardDetails.number}
                  focused={focus as Focused}
                />
                <Input
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
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={cardDetails.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
                <Input
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
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={3}
                  required
                />
                <Button type="submit">Pay ${amount}</Button>
              </VStack>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutForm;
