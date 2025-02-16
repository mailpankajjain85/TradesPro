import React from "react";
import { Navigate } from "react-router-dom";

const withAuthorization = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { loggedInUser } = props;

    if (!loggedInUser) {
      return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(loggedInUser.role)) {
      if (loggedInUser.role === "staff") {
        return <Navigate to="/all-transactions" />;
      }
      return <Navigate to="/unauthorized" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;