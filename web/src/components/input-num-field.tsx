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
  const [field, meta, helpers] = useField(rest);

  let isHorizontal = layout === "horizontal";

  let form = (
    <>
      <FormLabel htmlFor={field.name} minW={config.defaultLabelMinWidth}>{label}</FormLabel>
      <NumberInput
        {...rest as any}
        defaultValue={field.value}
        isInvalid={!!meta.error}
        id={field.name}
        onChange={val => helpers.setValue(parseInt(val))}
        width="100%"
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
    <FormControl isInvalid={!!meta.error} className="unselectable">
      {isHorizontal ? <HStack align="flex-start">{form}</HStack> : undefined}
      <Collapse in={!!meta.error} animateOpacity>
        <FormErrorMessage my={0} ml={isHorizontal ? config.defaultLabelMinWidth + 20 : undefined}>{meta.error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};