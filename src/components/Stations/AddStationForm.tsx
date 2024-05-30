import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EVStation } from "../../interfaces/EVStation";

const schema = yup.object().shape({
  stripeAccountID: yup.string().required("Stripe Account ID is required"),
  brand: yup.string().required("Brand is required"),
  totalNumberOfConnectors: yup
    .number()
    .required("Total Number of Connectors is required"),
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
  }),
  contacts: yup.object().shape({
    phone: yup.string().required("Phone Number is required"),
    website: yup.string().url("Website must be a valid URL"),
  }),
  position: yup.object().shape({
    latitude: yup.number().required("Latitude is required"),
    longitude: yup.number().required("Longitude is required"),
  }),
});

interface AddStationFormProps {
  onSubmit: (data: EVStation) => void;
}

const AddStationForm: React.FC<AddStationFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EVStation>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: EVStation) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <SimpleGrid columns={2} spacing={4}>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.stripeAccountID}>
            <FormLabel>Stripe Account ID</FormLabel>
            <Input {...register("stripeAccountID")} />
            <FormErrorMessage>
              {errors.stripeAccountID?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.brand}>
            <FormLabel>Brand</FormLabel>
            <Input {...register("brand")} />
            <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.totalNumberOfConnectors}>
            <FormLabel>Total Number of Connectors</FormLabel>
            <Input type="number" {...register("totalNumberOfConnectors")} />
            <FormErrorMessage>
              {errors.totalNumberOfConnectors?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.address}>
            <FormLabel>Address Street</FormLabel>
            <Input {...register("address.street")} />
            <FormErrorMessage>
              {errors.address?.street?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.address}>
            <FormLabel>Address City</FormLabel>
            <Input {...register("address.city")} />
            <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.address}>
            <FormLabel>Address Country</FormLabel>
            <Input {...register("address.country")} />
            <FormErrorMessage>
              {errors.address?.country?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.contacts}>
            <FormLabel>Contacts Phone</FormLabel>
            <Input {...register("contacts.phone")} placeholder="123-456-7890" />
            <FormErrorMessage>
              {errors.contacts?.phone?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.contacts}>
            <FormLabel>Contacts Website</FormLabel>
            <Input
              {...register("contacts.website")}
              placeholder="https://www.example.com"
            />
            <FormErrorMessage>
              {errors.contacts?.website?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.position}>
            <FormLabel>Position Latitude</FormLabel>
            <Input
              type="number"
              {...register("position.latitude")}
              placeholder="40.7128"
            />
            <FormErrorMessage>
              {errors.position?.latitude?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={!!errors.position}>
            <FormLabel>Position Longitude</FormLabel>
            <Input
              type="number"
              {...register("position.longitude")}
              placeholder="-74.0060"
            />
            <FormErrorMessage>
              {errors.position?.longitude?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
      </SimpleGrid>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddStationForm;
