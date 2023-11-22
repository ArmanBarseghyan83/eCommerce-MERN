import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
//import "bootstrap/dist/css/bootstrap.min.css"; // need this after installing bootstrap or use custom.css
//import "./index.css";
import "./assets/styles/bootstrap.custom.css"; // for custom bootstrap
import "./assets/styles/index.css"; // after deleting root index.css
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";

// npm i react-bootstrap bootstrap ract-icons(frontend)
// npm i react-router-bootstrapJ(frontend)
// npm i react-router-dom(frontend)
// npm i axios(frontend)
// npm i @reduxjs/toolkit react-redux(frontend)
// npm install react-toastify(frontend)
// npm i express(root)
// npm i -D nodemon concurrently(root)
// npm i -D dotenv(root)
// npm i mongoose(root)
// npm i bcryptjs(root)
// npm i colors(root)
// npm i jsonwebtoken(root)
// npm i cookie-parser(root)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/product/:productId" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
