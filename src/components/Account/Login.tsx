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
import appStateStore from "../../store/CommonStore/appStateStore";

const Login: React.FC = () => {
  // STORES
  const useAuthStore = createSelectors(authStore);
  const useAppStateStore = createSelectors(appStateStore);

  // USINGS
  const login = useAuthStore.use.login();
  const isOpen = useAppStateStore.use.isAuthModalOpen();
  const setIsOpen = useAppStateStore.use.setIsAuthModalOpen();

  // LOCAL STATE
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLogin = async () => {
    login(username, password);
    onClose();
  };

  const handleToggleForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  const onClose = () => {
    setIsOpen(false);
    setShowLoginForm(true); // Reset to login form when closing modal
  };

  const handleSwitchToRegister = () => {
    setShowLoginForm(false); // Switch to register form
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent bgColor={"complementary.300"} color={"primary.600"}>
        <ModalHeader color={"primary.600"}>
          {showLoginForm ? "Login" : "Register"}
        </ModalHeader>
        <ModalBody>
          {showLoginForm ? (
            <>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                colorScheme={"whiteAlpha"}
                mb={2}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                mb={4}
                colorScheme={"whiteAlpha"}
              />
              <Text
                color={"primary.600"}
                textAlign="center"
                fontSize="sm"
                mb={2}
              >
                Don't have an account?{" "}
                <Button
                  color={"accent.100"}
                  variant="link"
                  onClick={handleSwitchToRegister}
                >
                  Register here
                </Button>
              </Text>
            </>
          ) : (
            <RegistrationForm />
          )}
        </ModalBody>
        <ModalFooter>
          {showLoginForm ? (
            <Button bg={"accent.100"} mr={3} onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button
              bg={"accent.100"}
              variant="solid"
              mr={1}
              onClick={handleToggleForm}
            >
              Switch to Login
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
