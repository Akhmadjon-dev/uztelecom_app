import React from "react";
import { Route } from "react-router-dom";
import SignUp from "../containers/Auth/SignUp";
import SignIn from "../containers/Auth/SignIn";
import LocationAdd from "../containers/Locations/LocationsAdd";
import LocationList from "../containers/Locations/LocationsList";
import LocationUpdate from "../containers/Locations/LocationsUpdate";
import Profile from "../containers/Profile/Profile";
import LocationView from "../containers/Locations/LocationsView";
import Dashboard from "../containers/Dashboard/Dashboard";
import DashboardByRegion from "../containers/Dashboard/DashboardByRegion";
import Storage from "../containers/Storage/Storage";

export default {
  authenticated: [
    <Route key="storage" path="/storage" exact component={Storage} />,
    <Route
      key="dashboardByRegion"
      path="/dashboard/region"
      exact
      component={DashboardByRegion}
    />,
    <Route key="dashboard" path="/dashboard" exact component={Dashboard} />,
    <Route
      key="userProfilePage"
      path="/profile"
      exact
      render={() => <Profile />}
    />,
    <Route
      key="Location-create"
      path="/locations-create"
      exact
      component={LocationAdd}
    />,
    <Route
      key="Location-update"
      path="/locations-update/:id"
      exact
      component={LocationUpdate}
    />,
    <Route
      key="Location-list"
      path="/locations"
      exact
      component={LocationList}
    />,
    <Route
      key="Location-detail"
      path="/location/:id"
      exact
      component={LocationView}
    />,
    <Route key="add user" path="/users/add-user" exact component={SignUp} />,
  ],
  notAuthenticated: [
    <Route key="SignIn" path="/sign-in" exact component={SignIn} />,
    <Route key="SignUp" path="/sign-up" exact component={SignUp} />,
  ],
};
