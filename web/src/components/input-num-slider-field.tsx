import {
  Collapse, FormControl,
  FormErrorMessage, FormLabel, HStack,
  NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, Slider,
  SliderFilledTrack,
  SliderThumb, SliderTrack
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";
import { defaults } from "../configs/defaults";

type InputNumSliderFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  layout?: "horizontal" | "vertical";
};

export const InputNumSliderField: FC<InputNumSliderFieldProps> = ({
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
      <FormLabel htmlFor={field.name} minW={defaults.labelMinWidth}>{label}</FormLabel>
      <HStack width="100%" mx={isHorizontal ? 2 : undefined} spacing={5}>
        <NumberInput
          {...rest as any}
          value={field.value}
          defaultValue={field.value}
          isInvalid={!!error}
          id={field.name}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          mr={2}
          focusThumbOnChange={false} value={field.value}
          max={rest.max as number} colorScheme="teal"
          min={rest.min as number}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px" children={field.value} />
        </Slider>
      </HStack>
    </>
  );

  return (
    <FormControl isInvalid={!!error} className="unselectable">
      {isHorizontal ? <HStack align="center">{form}</HStack> : form}
      <Collapse in={!!error} animateOpacity>
        <FormErrorMessage my={0} ml={isHorizontal ? defaults.labelMinWidth + 20 : undefined}>{error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};