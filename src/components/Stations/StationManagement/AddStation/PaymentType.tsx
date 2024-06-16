import React from "react";
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  IconButton,
  Button,
  VStack,
  Checkbox,
  Tooltip,
} from "@chakra-ui/react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useFieldArray, useFormContext } from "react-hook-form";

interface PaymentTypesSectionProps {
  name: string;
  errors: any;
  register: any;
}

const PaymentTypesSection: React.FC<PaymentTypesSectionProps> = ({
  name,
  errors,
  register,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.types.type`,
  });

  return (
    <VStack w={"30rem"} align="start" mt={8}>
      <Tooltip label="Digital (card visa, google pay) or other methods (rfid card, cash)">
        <FormLabel>
          {name === "paymentMethods.ePayment"
            ? "Digital Payment Methods"
            : "Other Payment Methods"}
        </FormLabel>
      </Tooltip>

      <FormControl isInvalid={!!errors?.accept}>
        <Checkbox {...register(`${name}.accept`)}>
          Accept{" "}
          {name === "paymentMethods.ePayment"
            ? "Digital Payment"
            : "Other Payments"}
        </Checkbox>
        <FormErrorMessage>{errors?.accept?.message}</FormErrorMessage>
      </FormControl>
      {fields.map((field, index) => (
        <Box key={field.id} w="full" p={2}>
          <FormControl isInvalid={!!errors?.types?.type?.[index]}>
            <FormLabel>
              {name === "paymentMethods.ePayment"
                ? "Payment method"
                : "Other Payment Type"}
            </FormLabel>
            <Input
              placeholder="Add visa, google pay, apple pay"
              {...register(`${name}.types.type.${index}` as const)}
            />
            <FormErrorMessage>
              {errors?.types?.type?.[index]?.message}
            </FormErrorMessage>
          </FormControl>

          <IconButton
            aria-label={`Remove ${
              name === "paymentMethods.ePayment" ? "ePayment" : "Other Payment"
            } Type`}
            icon={<MdDelete />}
            onClick={() => remove(index)}
            mt={4}
          />
        </Box>
      ))}
      <Button onClick={() => append({ type: "" })} leftIcon={<MdAdd />} mt={4}>
        Add {name === "paymentMethods.ePayment" ? "ePayment" : "Other Payment"}{" "}
        Type
      </Button>
    </VStack>
  );
};

export default PaymentTypesSection;
