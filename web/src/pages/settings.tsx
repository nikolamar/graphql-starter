import { FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import { Wrapper } from '../components/wrapper';

const Settings: React.FC<{}> = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Wrapper minHeight="100vh">
      <FormControl display="flex" alignItems="center" mt={20}>
        <FormLabel htmlFor="email-alerts" mb="0">
          Turn {colorMode === "dark" ? "off" : "on"} dark mode?
        </FormLabel>
        <Switch id="color-theme" onChange={toggleColorMode} isChecked={colorMode === "dark"} colorScheme="teal"/>
      </FormControl>
    </Wrapper>
  );
}

export default Settings;