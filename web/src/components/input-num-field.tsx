import {
  Collapse, FormControl,
  FormErrorMessage, FormLabel,
  HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField, NumberInputStepper
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";
import { config } from "../config";

type InputNumFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  layout?: "horizontal" | "vertical";
};

export const InputNumField: FC<InputNumFieldProps> = ({
  label,
  layout = "vertical",
  ...rest
}) => {
  const [field, { error }, helpers] = useField(rest);

  const handleChange = (val: string | number) => {
    const num = typeof val === "string" ? parseInt(val) : val;
    helpers.setValue(num);
  }

  let isHorizontal = layout === "horizontal";

  let form = (
    <>
      <FormLabel htmlFor={field.name} minW={config.defaultLabelMinWidth}>{label}</FormLabel>
      <NumberInput
        {...rest as any}
        value={field.value}
        defaultValue={field.value}
        isInvalid={!!error}
        id={field.name}
        width="100%"
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );

  return (
    <FormControl isInvalid={!!error} className="unselectable">
      {isHorizontal ? <HStack align="center">{form}</HStack> : form}
      <Collapse in={!!error} animateOpacity>
        <FormErrorMessage my={0} ml={isHorizontal ? config.defaultLabelMinWidth + 20 : undefined}>{error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};