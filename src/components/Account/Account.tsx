import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createSelectors from "../../store/createSelectors";
import accountStore from "../../store/UserStore/accountStore";
import { User } from "../../interfaces/User";

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/,
      "Phone number is not valid (format: XXX-XXX-XXXX)"
    )
    .required("Phone number is required"),
});

const AccountDetails = () => {
  // STORES
  const useUserStore = createSelectors(accountStore);
  const user = useUserStore.use.user();
  const updateUser = useUserStore.use.setUser();

  // FORM SETUP
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user.username != "") {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [user, setValue]);

  const handleEditClick = (e: Event) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data) => {
    updateUser(data as User);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <Box mt="4">
        <Heading size="md">User not found.</Heading>
      </Box>
    );
  }

  return (
    <Box px={12} mt="4" maxW="700px" mx="auto">
      <Heading size="lg" mb="6">
        Profile
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" readOnly={!isEditing} />
              )}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} type="email" readOnly={!isEditing} />
              )}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormLabel>Phone Number</FormLabel>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input {...field} type="tel" readOnly={!isEditing} />
              )}
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <Box mt="6" textAlign="center">
          <Button mr={2} isDisabled={!isEditing} type="submit" bg="accent.200">
            Save
          </Button>
          {isEditing ? (
            <Button onClick={handleEditClick}>Cancel</Button>
          ) : (
            <Button type="button" onClick={handleEditClick} bg="accent.100">
              Edit Profile
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AccountDetails;
