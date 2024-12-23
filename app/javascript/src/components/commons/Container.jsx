import React from "react";

import PropTypes from "prop-types";

import SideBar from "components/SideBar";

const Container = ({ children }) => (
  <div className="flex">
    <SideBar />
    <div className="h-screen w-full overflow-auto">{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
