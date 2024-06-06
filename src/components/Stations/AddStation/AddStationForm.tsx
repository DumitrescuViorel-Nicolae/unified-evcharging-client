import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EVStation } from "../../../interfaces/EVStation";
import ConnectorDetail from "./ConnectorDetail";
import PaymentTypesSection from "./PaymentType";

const schema = yup.object().shape({
  brand: yup.string().required("Brand is required"),
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
  }),
  contacts: yup.object().shape({
    phone: yup.string().required("Phone Number is required"),
    website: yup
      .string()
      .url("Website must be a valid URL")
      .required("Website is required"),
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
      accept: yup.boolean().required("Accept ePayment is required"),
      types: yup.object().shape({
        type: yup
          .array()
          .of(yup.string().required("ePayment Type is required")),
      }),
    }),
    other: yup.object().shape({
      accept: yup.boolean().required("Accept Other Payments is required"),
      types: yup.object().shape({
        type: yup
          .array()
          .of(yup.string().required("Other Payment Type is required")),
      }),
    }),
  }),
});

const AddStationForm: React.FC = () => {
  const methods = useForm<EVStation>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const {
    fields: connectorFields,
    append: appendConnector,
    remove: removeConnector,
  } = useFieldArray({
    control,
    name: "connectorDetails",
  });

  const onSubmit: SubmitHandler<EVStation> = (data) => console.log(data);
  const onError = (errors: any) => {
    console.log("Form Errors:", errors);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={[3, 1]}>
            <FormControl isInvalid={!!errors.brand}>
              <FormLabel>Brand</FormLabel>
              <Input {...register("brand")} />
              <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={[3, 1]}>
            <FormControl isInvalid={!!errors.address?.street}>
              <FormLabel>Street</FormLabel>
              <Input {...register("address.street")} />
              <FormErrorMessage>
                {errors.address?.street?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={[3, 1]}>
            <FormControl isInvalid={!!errors.address?.city}>
              <FormLabel>City</FormLabel>
              <Input {...register("address.city")} />
              <FormErrorMessage>
                {errors.address?.city?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={[3, 1]}>
            <FormControl isInvalid={!!errors.address?.country}>
              <FormLabel>Country</FormLabel>
              <Input {...register("address.country")} />
              <FormErrorMessage>
                {errors.address?.country?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={[3, 1]}>
            <FormControl isInvalid={!!errors.contacts?.phone}>
              <FormLabel>Contacts Phone</FormLabel>
              <Input
                {...register("contacts.phone")}
                placeholder="123-456-7890"
              />
              <FormErrorMessage>
                {errors.contacts?.phone?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={[3, 1]}>
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

          {connectorFields.map((field, index) => (
            <ConnectorDetail
              key={field.id}
              field={field}
              index={index}
              register={register}
              errors={errors}
              removeConnector={removeConnector}
            />
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
            <PaymentTypesSection
              name="paymentMethods.ePayment"
              errors={errors.paymentMethods?.ePayment}
              register={register}
            />
          </GridItem>

          <GridItem colSpan={4}>
            <PaymentTypesSection
              name="paymentMethods.other"
              errors={errors.paymentMethods?.other}
              register={register}
            />
          </GridItem>

          <GridItem colSpan={4}>
            <Button mt={8} colorScheme="teal" type="submit">
              Submit
            </Button>
          </GridItem>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default AddStationForm;
