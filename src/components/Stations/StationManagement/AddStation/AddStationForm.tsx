import React, { useMemo } from "react";
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
import {
  AddConnectorDetailDTO,
  AddEVStationDTO,
} from "../../../../interfaces/AddEVStation";
import PaymentTypesSection from "./PaymentType";
import ConnectorDetailComponent from "./ConnectorDetailComponent";
import createSelectors from "../../../../store/createSelectors";
import accountStore from "../../../../store/UserStore/accountStore";
import evStationStore from "../../../../store/EVStationStore/evStationStore";

const schema = yup.object().shape({
  brand: yup.string().required("Brand is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone Number is required"),
  imageURL: yup.string().required("Image URL is required"),
  connectorDetails: yup.array().of(
    yup.object().shape({
      supplierName: yup.string().required("Supplier Name is required"),
      connectorType: yup.string().required("Connector Type is required"),
      chargeCapacity: yup.string().required("Charge Capacity is required"),
      maxPowerLevel: yup.number().required("Max Power Level is required"),
      price: yup.number().required("Price is required"),
      customerChargeLevel: yup
        .string()
        .required("Customer Charge Level is required"),
      customerConnectorName: yup
        .string()
        .required("Customer Connector Name is required"),
      numberOfConnectors: yup
        .number()
        .required("Number of Connectors is required"),
    })
  ),
  paymentMethods: yup
    .object()
    .shape({
      ePayment: yup.object().shape({
        accept: yup.boolean(),
        types: yup.object().shape({
          type: yup
            .array()
            .of(yup.string().required("ePayment Type is required")),
        }),
      }),
      other: yup.object().shape({
        accept: yup.boolean(),
        types: yup.object().shape({ type: yup.array().of(yup.string()) }),
      }),
    })
    .test(
      "at-least-one-accept",
      "At least one of ePayment or other must be accepted",
      function (value) {
        const { ePayment, other } = value;
        return ePayment.accept || other.accept;
      }
    ),
});

const AddStationForm: React.FC = () => {
  const methods = useForm<AddEVStationDTO>({
    resolver: yupResolver(schema),
  });

  const useAccountStore = createSelectors(accountStore);
  const useEvStationStore = createSelectors(evStationStore);
  const company = useAccountStore.use.company();
  const getCompany = useAccountStore.use.getCompany();
  const addEVStation = useEvStationStore.use.addEVStation();

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

  useMemo(() => {
    getCompany();
  }, [getCompany]);

  console.log("name", company);

  const onSubmit: SubmitHandler<AddEVStationDTO> = (data) => {
    const companyName = company?.companyName;
    const evStationToSubmit = { ...data, companyName: companyName };
    addEVStation(evStationToSubmit);
  };
  const onError = (errors: any) => {
    console.log("Form Errors:", errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          <GridItem>
            <FormControl isInvalid={!!errors.brand}>
              <FormLabel>Brand</FormLabel>
              <Input w={"20rem"} {...register("brand")} />
              <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.street}>
              <FormLabel>Street</FormLabel>
              <Input w={"20rem"} {...register("street")} />
              <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.city}>
              <FormLabel>City</FormLabel>
              <Input w={"20rem"} {...register("city")} />
              <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.country}>
              <FormLabel>Country</FormLabel>
              <Input w={"20rem"} {...register("country")} />
              <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Admin phone</FormLabel>
              <Input
                w={"20rem"}
                {...register("phone")}
                placeholder="123-456-7890"
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.imageURL}>
              <FormLabel>Image URL</FormLabel>
              <Input
                w={"20rem"}
                {...register("imageURL")}
                placeholder="https://www.example.com/image.jpg"
              />
              <FormErrorMessage>{errors.imageURL?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)">
          {connectorFields.map((field, index) => (
            <ConnectorDetailComponent
              key={field.id}
              field={field}
              index={index}
              register={register}
              errors={errors}
              removeConnector={removeConnector}
            />
          ))}
          <GridItem>
            <Button
              onClick={() => appendConnector({} as AddConnectorDetailDTO)}
              leftIcon={<MdAdd />}
              mt={4}
              mx={2}
            >
              Add Connector
            </Button>
          </GridItem>
        </Grid>

        <div>
          {" "}
          <Grid templateColumns="repeat(4, 1fr)">
            <GridItem colSpan={2}>
              <PaymentTypesSection
                name="paymentMethods.ePayment"
                errors={errors.paymentMethods?.ePayment}
                register={register}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <PaymentTypesSection
                name="paymentMethods.other"
                errors={errors.paymentMethods?.other}
                register={register}
              />
            </GridItem>
          </Grid>
        </div>

        <Button mt={8} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddStationForm;
