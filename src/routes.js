
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from 'views/Login/Login';
import Admins from "views/Admins/Admins.js";
import Analytics from "views/Analytics/Analytics.js";
import Branches from "views/Branches/Branches.js";
import Brands from "views/Brands/Brands.js";
import CompanyProfile from "views/CompanyProfile/CompanyProfile.js";
import Contacts from "views/Contacts/Contacts.js";
import Dashboard from "views/Dashboard.js";
import Integration from "views/Integration/Integration.js";
import InternetManagement from "views/InternetManagement/InternetManagement.js";
import InvoicesPayments from "views/InvoicesPayments/InvoicesPayments.js";
import Reports from "views/Reports/Reports.js";

const routes = (
  <Switch>
    <Route path="/" exact strict component={Login} />
    <Route path="/login" exact strict component={Login} />
    <Route path="/dashboard" exact strict component={Dashboard} />
    <Route path="/CompanyProfile" exact strict component={CompanyProfile} />
    <Route path="/Brands" exact strict component={Brands} />
    <Route path="/Reports" exact strict component={Reports} />
    <Route path="/Admins" exact strict component={Admins} />
    <Route path="/Analytics" exact strict component={Analytics} />
    <Route path="/Contacts" exact strict component={Contacts} />
    <Route path="/InvoicesPayments" exact strict component={InvoicesPayments} />
    <Route path="/InternetManagement" exact strict component={InternetManagement} />
    <Route path="/Integration" exact strict component={Integration} />
    <Route path="/Branches" exact strict component={Branches} />
  </Switch>
)
export default routes;

