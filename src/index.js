import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { inputAnatomy } from '@chakra-ui/anatomy'
import { ChakraProvider, extendTheme, createMultiStyleConfigHelpers, useColorModeValue} from '@chakra-ui/react'
import DarkModeToggle from './components/DarkModeToggle';
import { mode } from "@chakra-ui/theme-tools";


const root = ReactDOM.createRoot(document.getElementById('root'));
const { definePartsStyle, defineMultiStyleConfig } =  createMultiStyleConfigHelpers(inputAnatomy.keys)
//style={{background: '#5e9fa1'}}

const baseStyle = definePartsStyle({
  field: {
    borderColor: 'gray.50'
  },
})
const inputTheme = defineMultiStyleConfig({ baseStyle })

export const theme = extendTheme({
  components:{
    Input:inputTheme, 
    Select:inputTheme,
  },

  styles: {
    global: (props) => ({
      "html, body": {
        background: mode("#e1e4e8", "#333a41")(props),  //mode(light mode color, dark mode color)
        borderColor:'black'
      },
    }),
  },
});

root.render(

<BrowserRouter>

<ChakraProvider theme={theme}> 

   <DarkModeToggle />
    <App />

  </ChakraProvider>

</BrowserRouter>
);
