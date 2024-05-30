import { Image, Button, Flex } from "@chakra-ui/react";
import Login from "../Account/Login";
import logo from "../../assets/logo.png";
import UserStateCases from "./UserStateCases";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import accountStore from "../../store/UserStore/accountStore";

const NavBar = () => {
  // STORES
  const useAuthStore = createSelectors(authStore);
  const useUserStore = createSelectors(accountStore);
  // USING
  const isLoggendIn = useAuthStore.use.isLoggedIn();
  const user = useUserStore.use.user();

  return (
    <>
      <Flex
        as="nav"
        borderBottom="1px"
        borderColor="gray.200"
        bg="complementary.300"
        px={{ base: "6", md: "10", lg: "12" }}
        minWidth="max-content"
        p="1.25"
        justify="space-between"
        align="center"
      >
        {/* Left */}
        <Flex align="center">
          <Link to="/">
            <Image
              src={logo}
              alt="Logo"
              p={3}
              boxSize={"90px"}
              borderRadius="full"
            />
          </Link>
          <Filter />
        </Flex>

        {/* Middle */}

        {/* Right */}
        <Flex align="center">
          <Link to={"/manage-stations"}>
            {" "}
            <Button
              //hidden={user.role !== "Company"}
              bg={"accent.100"}
              fontSize="15px"
              mr="8"
            >
              Manage Stations
            </Button>
          </Link>
          <UserStateCases isLoggedIn={isLoggendIn} />
        </Flex>
      </Flex>

      {/* Modals */}
      <Login />
    </>
  );
};

export default NavBar;
