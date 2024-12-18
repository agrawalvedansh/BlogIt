import React from "react";

import PropTypes from "prop-types";

import SideBar from "components/SideBar";

const Container = ({ children }) => (
  <div className="flex">
    <SideBar />
    <div className="w-full">{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
