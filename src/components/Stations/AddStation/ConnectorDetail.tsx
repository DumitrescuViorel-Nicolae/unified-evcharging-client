import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EVStation } from "../../../interfaces/EVStation";

interface ConnectorDetailProps {
  field: any;
  index: number;
  register: UseFormRegister<EVStation>;
  errors: FieldErrors<EVStation>;
  removeConnector: (index: number) => void;
}

const ConnectorDetail: React.FC<ConnectorDetailProps> = ({
  field,
  index,
  register,
  errors,
  removeConnector,
}) => {
  return (
    <Box key={field.id} mt={4} p={4} borderWidth="1px" borderRadius="md">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem colSpan={[3, 1]}>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.supplierName}
          >
            <FormLabel>Supplier Name</FormLabel>
            <Input
              {...register(`connectorDetails.${index}.supplierName` as const)}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.supplierName?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[3, 1]}>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.connectorType}
          >
            <FormLabel>Connector Type</FormLabel>
            <Input
              {...register(`connectorDetails.${index}.connectorType` as const)}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.connectorType?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[3, 1]}>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.chargeCapacity}
          >
            <FormLabel>Charge Capacity</FormLabel>
            <Input
              {...register(`connectorDetails.${index}.chargeCapacity` as const)}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.chargeCapacity?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.maxPowerLevel}
          >
            <FormLabel>Max Power Level</FormLabel>
            <Input
              type="number"
              {...register(`connectorDetails.${index}.maxPowerLevel` as const)}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.maxPowerLevel?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.customerChargeLevel}
          >
            <FormLabel>Customer Charge Level</FormLabel>
            <Input
              {...register(
                `connectorDetails.${index}.customerChargeLevel` as const
              )}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.customerChargeLevel?.message}
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
  );
};

export default ConnectorDetail;
