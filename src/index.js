import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import ProductsSlice from './slices/ProductsSlice';
import MiscSlice from './slices/MiscSlice';
import UserSlice from './slices/UserSlice';
import CartSlice from './slices/CartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

let store=configureStore({
  reducer:{
    Products:ProductsSlice,
    User:UserSlice,
    Misc:MiscSlice,
    Cart:CartSlice
  }
})


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
