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
import { RegistrationFormData } from "../../interfaces/RegistrationFormData";
import createSelectors from "../../store/createSelectors";
import authStore from "../../store/UserStore/authStore";
import appStateStore from "../../store/CommonStore/appStateStore";

// Define the validation schema
const schema = yup.object().shape({
  UserDetails: yup.object().shape({
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
        /^(\(\d{3}\)?\s?|\d{3}-)\d{3}-\d{4}$/,
        "Phone number is not valid (format: XXX-XXX-XXXX)"
      )
      .required("Phone number is required"),
    role: yup.string().optional(),
  }),
  CompanyDetails: yup
    .object()
    .shape({
      website: yup.string().optional(),
      companyName: yup.string().optional(),
      registrationNumber: yup.string().optional(),
      taxNumber: yup.string().optional(),
      country: yup.string().optional(),
      city: yup.string().optional(),
      streetName: yup.string().optional(),
      zipCode: yup.string().optional(),
    })
    .optional(),
});

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

  const companyName = watch("CompanyDetails.companyName");

  const onSubmit = (data: RegistrationFormData) => {
    if (data.CompanyDetails && data.CompanyDetails.taxNumber) {
      data.UserDetails.role = "Company";
    } else {
      data.UserDetails.role = "User";
    }
    registerApi(data);
    if (registerSucceeded) {
      setIsModalOpen(false);
      reset();
    }
  };

  return (
    <form color="primary.600" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={!!errors.UserDetails?.username}
        id="username"
        mb={4}
      >
        <FormLabel>Username</FormLabel>
        <Input type="text" {...register("UserDetails.username")} />
        <FormErrorMessage>
          {errors.UserDetails?.username?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.UserDetails?.password}
        id="password"
        mb={4}
      >
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("UserDetails.password")} />
        <FormErrorMessage>
          {errors.UserDetails?.password?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.UserDetails?.email} id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register("UserDetails.email")} />
        <FormErrorMessage>
          {errors.UserDetails?.email?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.UserDetails?.phoneNumber}
        id="phoneNumber"
        mb={4}
      >
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          inputMode="numeric"
          maxLength={14}
          placeholder="(XXX) XXX-XXXX or XXX-XXX-XXXX"
          {...register("UserDetails.phoneNumber")}
        />
        <FormErrorMessage>
          {errors.UserDetails?.phoneNumber?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.CompanyDetails?.companyName}
        id="companyName"
        mb={4}
      >
        <FormLabel>Company Name</FormLabel>
        <Input
          type="text"
          {...register("CompanyDetails.companyName")}
          placeholder="N/A - Change if applicable"
        />
        <FormErrorMessage>
          {errors.CompanyDetails?.companyName?.message}
        </FormErrorMessage>
      </FormControl>

      {companyName && companyName !== "N/A" ? (
        <ScaleFade in>
          <SimpleGrid columns={2} spacing={4} mb={3}>
            <FormControl
              isInvalid={!!errors.CompanyDetails?.registrationNumber}
              id="registrationNumber"
            >
              <FormLabel>Registration Number</FormLabel>
              <Input
                type="text"
                {...register("CompanyDetails.registrationNumber")}
              />
              <FormErrorMessage>
                {errors.CompanyDetails?.registrationNumber?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.CompanyDetails?.taxNumber}
              id="taxNumber"
            >
              <FormLabel>Tax Number</FormLabel>
              <Input type="text" {...register("CompanyDetails.taxNumber")} />
              <FormErrorMessage>
                {errors.CompanyDetails?.taxNumber?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.CompanyDetails?.country}
              id="country"
            >
              <FormLabel>Country</FormLabel>
              <Input type="text" {...register("CompanyDetails.country")} />
              <FormErrorMessage>
                {errors.CompanyDetails?.country?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.CompanyDetails?.city} id="city">
              <FormLabel>City</FormLabel>
              <Input type="text" {...register("CompanyDetails.city")} />
              <FormErrorMessage>
                {errors.CompanyDetails?.city?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.CompanyDetails?.streetName}
              id="streetName"
            >
              <FormLabel>Street Name</FormLabel>
              <Input type="text" {...register("CompanyDetails.streetName")} />
              <FormErrorMessage>
                {errors.CompanyDetails?.streetName?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.CompanyDetails?.zipCode} id="zip">
              <FormLabel>Zip</FormLabel>
              <Input type="text" {...register("CompanyDetails.zipCode")} />
              <FormErrorMessage>
                {errors.CompanyDetails?.zipCode?.message}
              </FormErrorMessage>
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
