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
  Tooltip,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AddEVStationDTO } from "../../../interfaces/AddEVStation";

interface ConnectorDetailProps {
  field: any;
  index: number;
  register: UseFormRegister<AddEVStationDTO>;
  errors: FieldErrors<AddEVStationDTO>;
  removeConnector: (index: number) => void;
}

const ConnectorDetailComponent: React.FC<ConnectorDetailProps> = ({
  field,
  index,
  register,
  errors,
  removeConnector,
}) => {
  return (
    <Box key={field.id} mt={4} p={4} borderWidth="1px" borderRadius="md">
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <GridItem>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.supplierName}
          >
            <Tooltip label="Name of the connector producer (ex. Tesla, EOn)">
              <FormLabel>Supplier Name</FormLabel>
            </Tooltip>
            <Input
              {...register(`connectorDetails.${index}.supplierName` as const)}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.supplierName?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
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

        <GridItem>
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

        <GridItem>
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
        <GridItem>
          <FormControl
            isInvalid={!!errors.connectorDetails?.[index]?.numberOfConnectors}
          >
            <FormLabel>Number of Connectors</FormLabel>
            <Input
              type="number"
              {...register(
                `connectorDetails.${index}.numberOfConnectors` as const
              )}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.numberOfConnectors?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={!!errors.connectorDetails?.[index]?.price}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              {...register(`connectorDetails.${index}.price` as const)}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.price?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
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
        <GridItem>
          <FormControl
            isInvalid={
              !!errors.connectorDetails?.[index]?.customerConnectorName
            }
          >
            <FormLabel>Customer Connector Name</FormLabel>
            <Input
              {...register(
                `connectorDetails.${index}.customerConnectorName` as const
              )}
            />
            <FormErrorMessage>
              {errors.connectorDetails?.[index]?.customerConnectorName?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={[1]}>
          <IconButton
            aria-label="Remove Connector"
            icon={<MdDelete />}
            onClick={() => removeConnector(index)}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ConnectorDetailComponent;
