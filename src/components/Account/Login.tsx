import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@chakra-ui/react";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";

interface LoginProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}

const Login: React.FC<LoginProps> = ({ setIsOpen, isOpen }) => {
  // STORES
  const useAuthStore = createSelectors(authStore);

  // USINGS
  const login = useAuthStore.use.login();

  // STATE
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    login(username, password);
    onClose();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            mb={2}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            mb={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
