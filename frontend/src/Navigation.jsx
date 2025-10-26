import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  return (
    <div class="header">
      <NavLink to="/" className="link" exact activeClassName="link-active">
        Home
      </NavLink>
      <NavLink to="/Calendar" className="link" activeClassName="link-active">
        My Calendar
      </NavLink>
    </div>
  );
};

export default Navigation;
