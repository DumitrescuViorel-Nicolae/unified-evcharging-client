import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Grid,
  GridItem,
  VStack,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import { MdAdd, MdDelete } from "react-icons/md";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EVStation } from "../../interfaces/EVStation";

const schema = yup.object().shape({
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
  connectorDetails: yup.array().of(
    yup.object().shape({
      supplierName: yup.string().required("Supplier Name is required"),
      connectorType: yup.string().required("Connector Type is required"),
      chargeCapacity: yup.string().required("Charge Capacity is required"),
      maxPowerLevel: yup.number().required("Max Power Level is required"),
      customerChargeLevel: yup
        .string()
        .required("Customer Charge Level is required"),
      customerConnectorName: yup
        .string()
        .required("Customer Connector Name is required"),
      connectorStatuses: yup.array().of(
        yup.object().shape({
          physicalReference: yup
            .string()
            .required("Physical Reference is required"),
          state: yup.string().required("State is required"),
        })
      ),
    })
  ),
  paymentMethods: yup.object().shape({
    ePayment: yup.object().shape({
      accept: yup.boolean().required(),
      types: yup.object().shape({
        type: yup
          .array()
          .of(yup.string().required("ePayment Type is required")),
      }),
    }),
    other: yup.object().shape({
      accept: yup.boolean().required(),
      types: yup.object().shape({
        type: yup
          .array()
          .of(yup.string().required("Other Payment Type is required")),
      }),
    }),
  }),
});

interface AddStationFormProps {
  onSubmit: (data: EVStation) => void;
}

const AddStationForm: React.FC<AddStationFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EVStation>({
    resolver: yupResolver(schema),
  });

  const {
    fields: connectorFields,
    append: appendConnector,
    remove: removeConnector,
  } = useFieldArray({
    control,
    name: "connectorDetails",
  });

  const {
    fields: ePaymentFields,
    append: appendEPaymentType,
    remove: removeEPaymentType,
  } = useFieldArray({
    control,
    name: "paymentMethods.ePayment.types.type",
  });

  const {
    fields: otherPaymentFields,
    append: appendOtherPaymentType,
    remove: removeOtherPaymentType,
  } = useFieldArray({
    control,
    name: "paymentMethods.other.types.type",
  });

  const handleFormSubmit = (data: EVStation) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.brand}>
            <FormLabel>Brand</FormLabel>
            <Input {...register("brand")} />
            <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.totalNumberOfConnectors}>
            <FormLabel>Total Number of Connectors</FormLabel>
            <Input type="number" {...register("totalNumberOfConnectors")} />
            <FormErrorMessage>
              {errors.totalNumberOfConnectors?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.address?.street}>
            <FormLabel>Address Street</FormLabel>
            <Input {...register("address.street")} />
            <FormErrorMessage>
              {errors.address?.street?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.address?.city}>
            <FormLabel>Address City</FormLabel>
            <Input {...register("address.city")} />
            <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.address?.country}>
            <FormLabel>Address Country</FormLabel>
            <Input {...register("address.country")} />
            <FormErrorMessage>
              {errors.address?.country?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.contacts?.phone}>
            <FormLabel>Contacts Phone</FormLabel>
            <Input {...register("contacts.phone")} placeholder="123-456-7890" />
            <FormErrorMessage>
              {errors.contacts?.phone?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.contacts?.website}>
            <FormLabel>Contacts Website</FormLabel>
            <Input
              {...register("contacts.website")}
              placeholder="https://www.example.com"
            />
            <FormErrorMessage>
              {errors.contacts?.website?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl isInvalid={!!errors.position?.latitude}>
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
        </GridItem>
        <GridItem colSpan={[4, 4]}>
          <FormControl isInvalid={!!errors.position?.longitude}>
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
        </GridItem>

        {connectorFields.map((field, index) => (
          <Box
            key={field.id}
            mt={4}
            w="500px"
            p={4}
            borderWidth="1px"
            borderRadius="md"
          >
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem colSpan={[4, 1]}>
                <FormControl
                  isInvalid={!!errors.connectorDetails?.[index]?.supplierName}
                >
                  <FormLabel>Supplier Name</FormLabel>
                  <Input
                    {...register(
                      `connectorDetails.${index}.supplierName` as const
                    )}
                  />
                  <FormErrorMessage>
                    {errors.connectorDetails?.[index]?.supplierName?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[4, 1]}>
                <FormControl
                  isInvalid={!!errors.connectorDetails?.[index]?.connectorType}
                >
                  <FormLabel>Connector Type</FormLabel>
                  <Input
                    {...register(
                      `connectorDetails.${index}.connectorType` as const
                    )}
                  />
                  <FormErrorMessage>
                    {errors.connectorDetails?.[index]?.connectorType?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[4, 1]}>
                <FormControl
                  isInvalid={!!errors.connectorDetails?.[index]?.chargeCapacity}
                >
                  <FormLabel>Charge Capacity</FormLabel>
                  <Input
                    {...register(
                      `connectorDetails.${index}.chargeCapacity` as const
                    )}
                  />
                  <FormErrorMessage>
                    {errors.connectorDetails?.[index]?.chargeCapacity?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[4, 1]}>
                <FormControl
                  isInvalid={!!errors.connectorDetails?.[index]?.maxPowerLevel}
                >
                  <FormLabel>Max Power Level</FormLabel>
                  <Input
                    type="number"
                    {...register(
                      `connectorDetails.${index}.maxPowerLevel` as const
                    )}
                  />
                  <FormErrorMessage>
                    {errors.connectorDetails?.[index]?.maxPowerLevel?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[4, 1]}>
                <FormControl
                  isInvalid={
                    !!errors.connectorDetails?.[index]?.customerChargeLevel
                  }
                >
                  <FormLabel>Customer Charge Level</FormLabel>
                  <Input
                    {...register(
                      `connectorDetails.${index}.customerChargeLevel` as const
                    )}
                  />
                  <FormErrorMessage>
                    {
                      errors.connectorDetails?.[index]?.customerChargeLevel
                        ?.message
                    }
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>
            <IconButton
              aria-label="Remove Connector"
              icon={<MdDelete />}
              onClick={() => removeConnector(index)}
              mt={4}
            />
          </Box>
        ))}
        <GridItem colSpan={4}>
          <Button
            onClick={() => appendConnector({} as any)}
            leftIcon={<MdAdd />}
            mt={4}
          >
            Add Connector
          </Button>
        </GridItem>

        <GridItem colSpan={4}>
          <VStack align="start" mt={8}>
            <FormLabel>ePayment Methods</FormLabel>
            <FormControl isInvalid={!!errors.paymentMethods?.ePayment?.accept}>
              <Checkbox {...register("paymentMethods.ePayment.accept")}>
                Accept ePayment
              </Checkbox>
              <FormErrorMessage>
                {errors.paymentMethods?.ePayment?.accept?.message}
              </FormErrorMessage>
            </FormControl>
            {ePaymentFields.map((field, index) => (
              <Box key={field.id} w="full" p={2}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  <GridItem colSpan={3}>
                    <FormControl
                      isInvalid={
                        !!errors.paymentMethods?.ePayment?.types?.type?.[index]
                      }
                    >
                      <FormLabel>ePayment Type</FormLabel>
                      <Input
                        {...register(
                          `paymentMethods.ePayment.types.type.${index}` as const
                        )}
                      />
                      <FormErrorMessage>
                        {
                          errors.paymentMethods?.ePayment?.types?.type?.[index]
                            ?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <IconButton
                      aria-label="Remove ePayment Type"
                      icon={<MdDelete />}
                      onClick={() => removeEPaymentType(index)}
                      mt={4}
                    />
                  </GridItem>
                </Grid>
              </Box>
            ))}
            <Button
              onClick={() => appendEPaymentType({ type: "" })}
              leftIcon={<MdAdd />}
              mt={4}
            >
              Add ePayment Type
            </Button>
          </VStack>
        </GridItem>

        <GridItem colSpan={4}>
          <VStack align="start" mt={8}>
            <FormLabel>Other Payment Methods</FormLabel>
            <FormControl isInvalid={!!errors.paymentMethods?.other?.accept}>
              <Checkbox {...register("paymentMethods.other.accept")}>
                Accept Other Payments
              </Checkbox>
              <FormErrorMessage>
                {errors.paymentMethods?.other?.accept?.message}
              </FormErrorMessage>
            </FormControl>
            {otherPaymentFields.map((field, index) => (
              <Box key={field.id} w="full" p={2}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  <GridItem colSpan={3}>
                    <FormControl
                      isInvalid={
                        !!errors.paymentMethods?.other?.types?.type?.[index]
                      }
                    >
                      <FormLabel>Other Payment Type</FormLabel>
                      <Input
                        {...register(
                          `paymentMethods.other.types.type.${index}` as const
                        )}
                      />
                      <FormErrorMessage>
                        {
                          errors.paymentMethods?.other?.types?.type?.[index]
                            ?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <IconButton
                      aria-label="Remove Other Payment Type"
                      icon={<MdDelete />}
                      onClick={() => removeOtherPaymentType(index)}
                      mt={4}
                    />
                  </GridItem>
                </Grid>
              </Box>
            ))}
            <Button
              onClick={() => appendOtherPaymentType({ type: "" })}
              leftIcon={<MdAdd />}
              mt={4}
            >
              Add Other Payment Type
            </Button>
          </VStack>
        </GridItem>

        <GridItem colSpan={4}>
          <Button mt={8} colorScheme="teal" type="submit">
            Submit
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default AddStationForm;
