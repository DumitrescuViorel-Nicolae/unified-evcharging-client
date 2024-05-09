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
  Text,
} from "@chakra-ui/react";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";
import RegistrationForm from "./Register";

interface LoginProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}

const Login: React.FC<LoginProps> = ({ setIsOpen, isOpen }) => {
  // STORES
  const useAuthStore = createSelectors(authStore);

  // USINGS
  const login = useAuthStore.use.login();

  // LOCAL STATE
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = async () => {
    login(username, password);
    onClose();
  };

  const handleToggleForm = (cancelled: boolean) => {
    setShowLoginForm((prev) => {
      if (cancelled) {
        return false;
      } else {
        return !prev;
      }
    });
  };

  const onClose = () => {
    setIsOpen(false);
    handleToggleForm(true);
  };

  const returnLogin = () => {
    return (
      <>
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
      </>
    );
  };

  const returnRegister = () => {
    return (
      <>
        <RegistrationForm />
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{showLoginForm ? "Login" : "Register"}</ModalHeader>
        <ModalBody>
          {showLoginForm ? returnLogin() : returnRegister()}
        </ModalBody>
        {!showLoginForm && (
          <Text textAlign="center" fontSize="sm" mt={2} mb={4}>
            Already have an account?{" "}
            <Button variant="link" onClick={(e) => handleToggleForm(false)}>
              Switch to Login
            </Button>
          </Text>
        )}
        <ModalFooter>
          <Button
            hidden={!showLoginForm}
            colorScheme="green"
            mr={3}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
