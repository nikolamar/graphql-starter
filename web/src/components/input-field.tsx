import {
  Collapse, FormControl,
  FormErrorMessage, FormLabel,
  HStack, Input, Textarea, VStack
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";
import { config } from "../config";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  layout?: "horizontal" | "vertical";
  textarea?: boolean;
  children?: any;
};

export const InputField: FC<InputFieldProps> = ({
  label,
  textarea,
  children,
  layout = "vertical",
  ...rest
}) => {
  const [field, { error }] = useField(rest);

  let InputOrTextarea: any = Input;

  if (textarea) {
    InputOrTextarea = Textarea;
  }

  let isHorizontal = layout === "horizontal";

  let form = (
    <>
      <FormLabel htmlFor={field.name} minW={config.defaultLabelMinWidth}>{label}</FormLabel>
      <HStack align="flex-end" width="100%">
        <InputOrTextarea {...field} {...rest} id={field.name} />
        <VStack>
          {children}
        </VStack>
      </HStack>
    </>
  );

  return (
    <FormControl isInvalid={!!error} className="unselectable">
      {isHorizontal ? <HStack align="center">{form}</HStack> : form}
      <Collapse in={!!error} animateOpacity>
        <FormErrorMessage my={0} ml={isHorizontal ? config.defaultLabelMinWidth + 20 : undefined}>{error}</FormErrorMessage>
      </Collapse >
    </FormControl>
  );
};