import { useState } from "react";
import { Image, Button, Flex } from "@chakra-ui/react";
import Login from "../Account/Login";
import logo from "../../assets/logo.png";
import UserStateCases from "./UserStateCases";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";
import { Link } from "react-router-dom";
import Filter from "./Filter";

const NavBar = () => {
  // STORES
  const useAuthStore = createSelectors(authStore);

  // USING
  const isLoggendIn = useAuthStore.use.isLoggedIn();

  // LOCAL STATE
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
              boxSize={"100px"}
              borderRadius="full"
            />
          </Link>
        </Flex>

        {/* Middle */}
        <Filter />

        {/* Right */}
        <Flex align="center">
          <Button bg={"accent.100"} fontSize="15px" mr="8">
            Add EV Charger
          </Button>
          <UserStateCases
            isLoggedIn={isLoggendIn}
            setIsLoginOpen={setIsLoginOpen}
          />
        </Flex>
      </Flex>

      {/* Modals */}
      <Login isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </>
  );
};

export default NavBar;
