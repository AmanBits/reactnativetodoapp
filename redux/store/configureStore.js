import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// Replace with your reducer
import rootSaga from '../sagas'; // Replace with your sagas
import taskReducer from '../reducers/taskReducer';

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: taskReducer, // Replace with your single reducer or combine reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Add saga middleware
});

// Run the Saga
sagaMiddleware.run(rootSaga);

export default store;
