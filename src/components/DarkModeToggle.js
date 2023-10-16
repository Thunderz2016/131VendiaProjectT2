import { useColorMode } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";


function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Switch 
      isChecked={colorMode === 'dark'}
      onChange={toggleColorMode}
      size="sm"
      colorScheme="red" // You can choose a color scheme that suits your design
      position="fixed"
      bottom="4"
      left="4"
    >
      Dark Mode
    </Switch>
  )
}

 
export default DarkModeToggle;