import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import createSelectors from "../../store/createSelectors";
import accountStore from "../../store/UserStore/accountStore";
import { User } from "../../interfaces/User";

const AccountDetails = () => {
  // STORES
  const useUserStore = createSelectors(accountStore);
  const user = useUserStore.use.user();
  const updateUser = useUserStore.use.setUser();

  // LOCAL STATE
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to update user details
    updateUser(formData as User);
  };

  if (!user) {
    return (
      <Box mt="4">
        <Heading size="md">User not found.</Heading>
      </Box>
    );
  }

  return (
    <Box px={12} mt="4">
      <Heading size="lg" mb="4">
        Profile
      </Heading>
      <Stack width={"300px"} spacing="4" m={"0 auto"}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </FormControl>
        {isEditing ? (
          <Button
            type="submit"
            onClick={handleSubmit}
            width={"100px"}
            m={"0 auto"}
            colorScheme="blue"
          >
            Save
          </Button>
        ) : (
          <Button
            width={"100px"}
            m={"0 auto"}
            onClick={handleEditClick}
            bg={"accent.100"}
          >
            Edit Profile
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default AccountDetails;
