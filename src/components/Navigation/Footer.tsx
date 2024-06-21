import { Box, Container, Text, Link, Flex } from "@chakra-ui/react";

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
          <Flex mr={120} gap={3}>
            <Link href="#">Contact</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Partners</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
