import {
  Button,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiUser, BiHistory, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

interface UserStateCasesProps {
  isLoggedIn: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
}

const UserStateCases: React.FC<UserStateCasesProps> = ({
  isLoggedIn,
  setIsLoginOpen,
}) => {
  const returnUserAccount = () => {
    // Return a menu with user-related links
    return (
      <Menu>
        <MenuButton
          as={Button}
          bg="accent.100"
          color="white"
          fontWeight="bold"
          rounded="full"
          p="2"
          border="1px"
          borderColor="transparent"
          _hover={{ bg: "#0c270b" }}
        >
          User Account
        </MenuButton>
        <MenuList>
          <MenuItem icon={<BiUser fontSize={"1.5rem"} />}>
            User Details
          </MenuItem>
          <Link to="/history">
            <MenuItem icon={<BiHistory fontSize={"1.5rem"} />}>
              History
            </MenuItem>
          </Link>
          <MenuItem icon={<BiLogOut fontSize={"1.5rem"} />}>Log out</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const returnLogin = () => {
    // Return a login button
    return (
      <Button
        onClick={() => setIsLoginOpen(true)}
        bg="accent.100"
        fontWeight="bold"
        rounded="full"
        p="2"
        border="1px"
        borderColor="transparent"
        _hover={{ bg: "#0c270b" }}
      >
        <Text mr="2">Log in</Text>
        <Icon as={BiUser} fontSize="22px" />
      </Button>
    );
  };

  // Return either the user account menu or the login button based on the isLoggedIn state
  return isLoggedIn ? returnUserAccount() : returnLogin();
};

export default UserStateCases;
