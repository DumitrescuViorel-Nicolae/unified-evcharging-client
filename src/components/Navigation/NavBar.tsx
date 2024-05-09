import { useState } from "react";
import { Image, Input, Button, Flex, Icon } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import Login from "../Account/Login";
import logo from "../../assets/logo.png";
import UserStateCases from "./UserStateCases";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";
import { Link } from "react-router-dom";

const NavBar = () => {
  // STORES
  const useAuthStore = createSelectors(authStore);

  // USING
  const isLoggendIn = useAuthStore.use.isLoggedIn();

  // LOCAL STATE
  const [inputSearch, setInputSearch] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleInputSearch = (searchString: string) => {
    setInputSearch(searchString);
  };

  return (
    <>
      <Flex
        as="nav"
        borderBottom="1px"
        borderColor="gray.200"
        bg="gray.100"
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
        <Flex>
          <Input
            type="search"
            placeholder="Search"
            value={inputSearch}
            borderColor={"green"}
            color={"green"}
            _placeholder={{ color: "inherit" }}
            focusBorderColor="#27961f"
            size={"lg"}
            onChange={(e) => handleInputSearch(e.target.value)}
          />
          <Button bg="#27961f" color="white" ml="2" rounded="full" p="2">
            <Icon boxSize={6} as={FiSearch} />
          </Button>
        </Flex>

        {/* Right */}
        <Flex align="center">
          <Button fontSize="15px" mr="8">
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
