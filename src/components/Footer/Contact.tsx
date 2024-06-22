import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Button,
  Box,
  Grid,
  GridItem,
  VStack,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Define the form schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

// Define the form data type
type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUsForm: React.FC = () => {
  // Use react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  // Define the form submit handler
  const onSubmit = (data: ContactFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <Box maxW="6xl" mx="auto" mt={8} p={4}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
        <GridItem
          textColor={"primary.600"}
          bg="complementary.300"
          p={6}
          borderRadius="md"
        >
          <VStack spacing={4} align="start">
            <Text fontSize="2xl" fontWeight="bold">
              Contact Information
            </Text>
            <Text>Phone: (123) 456-7890</Text>
            <Text>Email: info@example.com</Text>
            <Text>
              We are here to assist you with any questions or concerns you may
              have.
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} type="email" />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.subject}>
                <FormLabel>Subject</FormLabel>
                <Input {...register("subject")} />
                <FormErrorMessage>{errors.subject?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.message}>
                <FormLabel>Message</FormLabel>
                <Textarea {...register("message")} />
                <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
              </FormControl>

              <Button type="submit" bg={"accent.100"} width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ContactUsForm;
