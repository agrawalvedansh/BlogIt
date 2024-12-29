import React from "react";

import PropTypes from "prop-types";

import SideBar from "components/SideBar";

const Container = ({ children, selectedCategories, setSelectedCategories }) => (
  <div className="flex">
    <SideBar {...{ selectedCategories, setSelectedCategories }} />
    <div className="h-screen w-full overflow-auto">{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
