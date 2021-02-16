import { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  HStack,
  Slider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Collapse,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { FC } from "react";

type InputNumSliderFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputNumSliderField: FC<InputNumSliderFieldProps> = ({
  label,
  ...rest
}) => {
  const [field, meta, helpers] = useField(rest);

  const handleChange = (val: string | number) => {
    const num = typeof val === "string" ? parseInt(val) : val;
    helpers.setValue(num);
  }

  return (
    <FormControl isInvalid={!!meta.error} className="unselectable">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <HStack>
        <NumberInput
          {...rest as any}
          defaultValue={field.value}
          value={field.value}
          isInvalid={!!meta.error}
          id={field.name}
          onChange={handleChange}
          mr={5}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          flex="1" focusThumbOnChange={false} value={field.value}
          onChange={handleChange} min={rest.min as number}
          max={rest.max as number} colorScheme="teal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px" children={field.value} />
        </Slider>
      </HStack>
      <Collapse in={!!meta.error} animateOpacity>
        <FormErrorMessage my={0}>{meta.error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};