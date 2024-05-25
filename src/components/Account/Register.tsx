import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  SimpleGrid,
  ScaleFade,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationFormData } from "../../interfaces/RegistrationFormData ";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";
import appStateStore from "../../store/CommonStore/appStateStore";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/,
      "Phone number is not valid (format: XXX-XXX-XXXX)"
    )
    .required("Phone number is required"),
  companyName: yup.string(),
});

const addConditionalFields = (companyName: string | undefined) => {
  const conditionalFields: { [key: string]: any } = {};
  if (companyName && !companyName.includes("N/A")) {
    conditionalFields.registrationNumber = yup
      .string()
      .required("Registration Number is required");
    conditionalFields.taxNumber = yup
      .string()
      .required("Tax Number is required");
    conditionalFields.country = yup.string().required("Country is required");
    conditionalFields.city = yup.string().required("City is required");
    conditionalFields.streetName = yup
      .string()
      .required("Street Name is required");
    conditionalFields.zip = yup.string().required("Zip is required");
  }
  return conditionalFields;
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });

  // STORES
  const useAuthStore = createSelectors(authStore);
  const useAppStateStore = createSelectors(appStateStore);
  const registerApi = useAuthStore.use.register();
  const registerSucceeded = useAuthStore.use.registerSucceeded();
  const setIsModalOpen = useAppStateStore.use.setIsAuthModalOpen();

  const companyName = watch("companyName");
  const conditionalFields = addConditionalFields(companyName);
  yup.object().shape({
    ...schema.fields,
    ...conditionalFields,
  });

  const onSubmit = (data: RegistrationFormData) => {
    if (data.taxNumber) {
      data.role = "Company";
    } else {
      data.role = "User";
    }
    registerApi(data);
    console.log(registerSucceeded);
    if (registerSucceeded) {
      setIsModalOpen(false);
      reset();
    }
  };

  return (
    <form color="primary.600" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.username} id="username" mb={4}>
        <FormLabel>Username</FormLabel>
        <Input type="text" {...register("username")} required />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password} id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} required />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email} id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register("email")} required />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.phoneNumber} id="phoneNumber" mb={4}>
        <FormLabel>Phone Number</FormLabel>

        <Input
          type="tel"
          inputMode="numeric"
          maxLength={14}
          placeholder="(XXX) XXX-XXXX or XXX-XXX-XXXX"
          {...register("phoneNumber")}
          required
        />
        <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.companyName} id="role" mb={4}>
        <FormLabel>Company</FormLabel>
        <Input
          type="text"
          {...register("companyName")}
          required
          defaultValue={"N/A - Change if applicable"}
        />
        <FormErrorMessage>{errors.companyName?.message}</FormErrorMessage>
      </FormControl>

      {companyName && !companyName.includes("N/A") ? (
        <ScaleFade in>
          <SimpleGrid columns={2} spacing={4} mb={3}>
            <FormControl
              isInvalid={!!errors.registrationNumber}
              id="registrationNumber"
            >
              <FormLabel>Registration Number</FormLabel>
              <Input type="text" {...register("registrationNumber")} />
              <FormErrorMessage>
                {!!errors.registrationNumber?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.taxNumber} id="taxNumber">
              <FormLabel>Tax Number</FormLabel>
              <Input type="text" {...register("taxNumber")} />
              <FormErrorMessage>{!!errors.taxNumber?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.country} id="country">
              <FormLabel>Country</FormLabel>
              <Input type="text" {...register("country")} />
              <FormErrorMessage>{!!errors.country?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.city} id="city">
              <FormLabel>City</FormLabel>
              <Input type="text" {...register("city")} />
              <FormErrorMessage>{!!errors.city?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.streetName} id="streetName">
              <FormLabel>Street Name</FormLabel>
              <Input type="text" {...register("streetName")} />
              <FormErrorMessage>
                {!!errors.streetName?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.zip} id="zip">
              <FormLabel>Zip</FormLabel>
              <Input type="text" {...register("zip")} />
              <FormErrorMessage>{!!errors.zip?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        </ScaleFade>
      ) : null}

      <Button type="submit" isLoading={isSubmitting} bg={"accent.100"}>
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
