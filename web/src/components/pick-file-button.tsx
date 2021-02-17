import { Button, ButtonProps } from "@chakra-ui/react";
import { ChangeEventHandler, FC } from "react";

type PickFileButtonProps = Omit<ButtonProps, "onChange"> & {
  onChange?: ChangeEventHandler<{}>;
}

export const PickFileButton: FC<PickFileButtonProps> = ({
  onChange,
  ...rest
}) => (
  <label style={{position: "relative"}}>
    <Button colorScheme="teal" {...rest}>
      Pick Image
    </Button>
    <input
      type="file"
      style={{
        opacity: 0,
        left: 0, right: 0,
        position: "absolute",
        height: 45,
        background: "red",
      }}
      onChange={onChange}
    />
  </label>
);