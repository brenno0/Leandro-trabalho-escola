import React from 'react';
import  { App }  from './App';
import ReactDOM from 'react-dom';
import { theme } from './common/utils/theme';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

