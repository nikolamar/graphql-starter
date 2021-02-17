import {
  FormControl,
  FormErrorMessage, FormLabel,
  Input,
  Textarea,
  Collapse,
  HStack
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  children?: any;
};

export const InputField: FC<InputFieldProps> = ({
  label,
  textarea,
  children,
  ...rest
}) => {
  let InputOrTextarea: any = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(rest);
  return (
    <FormControl isInvalid={!!error} className="unselectable">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <HStack align="flex-end">
        <InputOrTextarea {...field} {...rest} id={field.name} />
        {children}
      </HStack>
      <Collapse in={!!error} animateOpacity>
        <FormErrorMessage my={0}>{error}</FormErrorMessage>
      </Collapse >
    </FormControl>
  );
};