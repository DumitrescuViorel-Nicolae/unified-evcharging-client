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
    <VStack align="start" mt={8}>
      <FormLabel>
        {name === "paymentMethods.ePayment"
          ? "ePayment Methods"
          : "Other Payment Methods"}
      </FormLabel>
      <FormControl isInvalid={!!errors?.accept}>
        <Checkbox {...register(`${name}.accept`)}>
          Accept{" "}
          {name === "paymentMethods.ePayment" ? "ePayment" : "Other Payments"}
        </Checkbox>
        <FormErrorMessage>{errors?.accept?.message}</FormErrorMessage>
      </FormControl>
      {fields.map((field, index) => (
        <Box key={field.id} w="full" p={2}>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem colSpan={3}>
              <FormControl isInvalid={!!errors?.types?.type?.[index]}>
                <FormLabel>
                  {name === "paymentMethods.ePayment"
                    ? "ePayment Type"
                    : "Other Payment Type"}
                </FormLabel>
                <Input {...register(`${name}.types.type.${index}`)} />
                <FormErrorMessage>
                  {errors?.types?.type?.[index]?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <IconButton
                aria-label={`Remove ${
                  name === "paymentMethods.ePayment"
                    ? "ePayment"
                    : "Other Payment"
                } Type`}
                icon={<MdDelete />}
                onClick={() => remove(index)}
                mt={4}
              />
            </GridItem>
          </Grid>
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
