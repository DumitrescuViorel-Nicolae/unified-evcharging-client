import { Box, Container, Text } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <Container maxW="container.lg" mt={8}>
      <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
        <Text fontSize="xl">Welcome to the homepage!</Text>
        {/* Add your Chakra UI cards or any other content here */}
      </Box>
    </Container>
  );
};
