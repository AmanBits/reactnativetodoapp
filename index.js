import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App'; // Main app component
import store from './redux/store/configureStore'; // Redux store

// Wrap App with Provider and pass the Redux store
const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the root component for Expo
registerRootComponent(RootComponent);
