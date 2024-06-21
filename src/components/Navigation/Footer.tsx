import { Box, Container, Text, Link, Flex } from "@chakra-ui/react";

function Footer() {
  return (
    <Box as="footer" bg="complementary.300" mt={"auto"} color="white" py={4}>
      <Container maxW="container.xl">
        <Flex direction={"row"} gap={3} justifyContent={"space-between"}>
          <Text alignItems={"flex-start"} textAlign="center">
            &copy; {new Date().getFullYear()} Unified Charging Stations. All
            rights reserved.
          </Text>
          <Flex gap={3}>
            <Text fontSize="lg" fontWeight="bold">
              My Website
            </Text>
            <Link href="#">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Services</Link>
            <Link href="#">Contact</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
