import React from 'react';
import  { App }  from './App';
import ReactDOM from 'react-dom';
import { theme } from './common/utils/theme';
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </ChakraProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

