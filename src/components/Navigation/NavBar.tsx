import { useState } from "react";
import { Image, Input, Button, Flex, Text, Icon } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import Login from "../Account/Login";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
          <Image src={logo} alt="Logo" boxSize={"100px"} borderRadius="full" />
        </Flex>

        {/* Middle */}
        <Flex>
          <Input
            type="search"
            placeholder="Search"
            value={inputSearch}
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
          <Button
            onClick={() => setIsOpen(true)}
            bg="#1f8526"
            color="white"
            fontWeight="bold"
            rounded="full"
            p="2"
            border="1px"
            borderColor="transparent"
            _hover={{ bg: "#0c270b" }}
          >
            <Text mr="2">Sign in</Text>
            <Icon as={BiUser} fontSize="22px" />
          </Button>
        </Flex>
      </Flex>
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default NavBar;
