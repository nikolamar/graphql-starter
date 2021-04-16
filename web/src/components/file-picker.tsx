import { Box, BoxProps } from "@chakra-ui/react";
import { ChangeEventHandler, FC } from "react";
import styles from "./file-picker.module.css";

type FilePickerProps = Omit<BoxProps, "onChange"> & {
  onChange?: ChangeEventHandler<{}>;
  children: React.ReactNode;
};

export const FilePicker: FC<FilePickerProps> = ({
  onChange,
  children,
  ...rest
}) => (
  <Box {...rest} className={styles.container}>
    {children}
    <input type="file" onChange={onChange} className={styles.input} />
  </Box>
);
