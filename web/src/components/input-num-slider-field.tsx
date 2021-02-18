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
import { config } from "../config";

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
  const [field, meta, helpers] = useField(rest);

  const handleChange = (val: string | number) => {
    const num = typeof val === "string" ? parseInt(val) : val;
    helpers.setValue(num);
  }

  let isHorizontal = layout === "horizontal";

  let form = (
    <>
      <FormLabel htmlFor={field.name} minW={config.defaultLabelMinWidth}>{label}</FormLabel>
      <HStack width="100%" mx={isHorizontal ? 2 : undefined} spacing={5}>
        <NumberInput
          {...rest as any}
          defaultValue={field.value}
          value={field.value}
          isInvalid={!!meta.error}
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
          onChange={handleChange} min={rest.min as number}
          max={rest.max as number} colorScheme="teal"
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
    <FormControl isInvalid={!!meta.error} className="unselectable">
      {layout === "vertical" ? form : <HStack align="center">{form}</HStack>}
      <Collapse in={!!meta.error} animateOpacity>
        <FormErrorMessage my={0} ml={isHorizontal ? config.defaultLabelMinWidth + 20 : undefined}>{meta.error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};