import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box as="footer" bg="complementary.300" mt="auto" color="white" py={4}>
      <Container maxW="container.2xl">
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>
            &copy; {new Date().getFullYear()} Unified Charging Stations. All
            rights reserved.
          </Text>
          <Flex color={"accent.100"} mr={120} gap={3}>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="#">Partners</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
