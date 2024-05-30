import {
  Button,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiUser, BiHistory, BiLogOut, BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import createSelectors from "../../store/createSelectors";
import appStateStore from "../../store/CommonStore/appStateStore";

interface UserStateCasesProps {
  isLoggedIn: boolean;
}

const UserStateCases: React.FC<UserStateCasesProps> = ({ isLoggedIn }) => {
  const useAppStateStore = createSelectors(appStateStore);
  const setAuthModal = useAppStateStore.use.setIsAuthModalOpen();

  const returnUserAccount = () => {
    // Return a menu with user-related links
    return (
      <Menu>
        <MenuButton
          as={Button}
          bg="accent.100"
          rounded="full"
          p="2"
          border="1px"
          borderColor="transparent"
        >
          User Account
        </MenuButton>
        <MenuList>
          <Link to="/account">
            <MenuItem icon={<BiUser fontSize={"1.5rem"} />}>
              User Details
            </MenuItem>
          </Link>
          <Link to="/">
            <MenuItem icon={<BiHeart fontSize={"1.5rem"} />}>
              Saved Locations
            </MenuItem>
          </Link>
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
        onClick={() => setAuthModal(true)}
        bg="accent.100"
        rounded="full"
        p="2"
        border="1px"
        borderColor="transparent"
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
