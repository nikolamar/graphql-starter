import { IconButton, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle: FC<{}> = (props) => {
  
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      {...props}
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
