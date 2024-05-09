import { ChangeEvent, FormEvent, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "N/A - Change if applicable",
  });

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Reset form fields after submission
    setFormData({
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      role: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="username" mb={4}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl id="phoneNumber" mb={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl id="role" mb={4}>
        <FormLabel>Company</FormLabel>
        <Input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          defaultValue={"User"}
        />
      </FormControl>
      <Button type="submit" colorScheme="green">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
