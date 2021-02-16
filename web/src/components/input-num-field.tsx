import { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Collapse,
} from "@chakra-ui/react";
import { FC } from "react";

type InputNumFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputNumField: FC<InputNumFieldProps> = ({
  label,
  ...rest
}) => {
  const [field, meta, helpers] = useField(rest);
  return (
    <FormControl isInvalid={!!meta.error} className="unselectable">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <NumberInput
        {...rest as any}
        defaultValue={field.value}
        isInvalid={!!meta.error}
        id={field.name}
        onChange={val => helpers.setValue(parseInt(val))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Collapse in={!!meta.error} animateOpacity>
        <FormErrorMessage my={0}>{meta.error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};