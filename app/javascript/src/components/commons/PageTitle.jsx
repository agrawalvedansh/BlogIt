import React from "react";

import { Button } from "@bigbinary/neetoui";

const PageTitle = ({ title, showButton, buttonLabel, handleClick }) => (
  <div className="mx-14 mt-14 flex items-end justify-between">
    <h2 className="text-5xl font-bold">{title}</h2>
    {showButton && (
      <div>
        <Button
          className="neetix-button--primary"
          label={buttonLabel}
          size="medium"
          onClick={() => handleClick()}
        />
      </div>
    )}
  </div>
);

export default PageTitle;
