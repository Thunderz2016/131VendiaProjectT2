import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import DarkModeToggle from './components/DarkModeToggle';
import { mode } from "@chakra-ui/theme-tools";


const root = ReactDOM.createRoot(document.getElementById('root'));

//const bg = useColorModeValue('#5e9fa1','#485c62');
//style={{background: '#5e9fa1'}}

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        background: mode("#e1e4e8", "#333a41")(props),  //mode(light mode color, dark mode color)
      },



      Input:{  
        baseStyle: {
          field: {
            borderColor: 'black'
          }
        },
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
