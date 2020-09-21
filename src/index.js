
import "assets/css/nucleo-icons.css";
import "assets/scss/black-dashboard-react.scss";
import 'font-awesome/css/font-awesome.min.css';
import AdminLayout from "layouts/Admin/Admin.js";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from './store/configureStore';
import { Errors } from "./components/ComponentModule";




ReactDOM.render(
  <Provider store={configureStore}>
    <BrowserRouter>
      <AdminLayout />
    </BrowserRouter>
    <Errors />

  </Provider>,
  document.getElementById("root")
);
