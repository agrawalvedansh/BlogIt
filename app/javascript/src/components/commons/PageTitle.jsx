import React, { useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button, ActionDropdown, Tag } from "@bigbinary/neetoui";

const PageTitle = ({
  title,
  showButton,
  buttonLabel,
  handleClick,
  showDropdown,
  showDraftTag,
  showDownloadButton,
  handleDownload,
  history,
}) => {
  const { Menu, MenuItem } = ActionDropdown;
  const [label, setLabel] = useState("Publish");

  return (
    <div className="mx-14 mt-14 flex items-center justify-between">
      <h2 className="text-5xl font-bold">{title}</h2>
      {showDraftTag && (
        <Tag
          className="ml-5 mr-auto w-20 bg-white"
          label="Draft"
          style="danger"
        />
      )}
      {showDownloadButton && (
        <div className="ml-auto mr-4 cursor-pointer">
          <Download onClick={handleDownload} />
        </div>
      )}
      {showButton && (
        <div>
          <Button
            className="neetix-button--primary"
            label={buttonLabel}
            size="medium"
            onClick={() => handleClick(label)}
          />
        </div>
      )}
      {showDropdown && (
        <div className="flex gap-3">
          <Button
            label="Cancel"
            size="medium"
            style="tertiary"
            onClick={() => history.push("/")}
          />
          <ActionDropdown
            className="neetix-actiondropdown"
            label={label}
            buttonProps={{
              className: "neetix-button--primary",
            }}
            dropdownProps={{
              buttonProps: {
                className: "neetix-button--primary",
              },
            }}
            onClick={() => handleClick(label)}
          >
            <Menu>
              <MenuItem
                className="cursor-pointer p-3 text-sm"
                onClick={() => setLabel("Publish")}
              >
                Publish
              </MenuItem>
              <MenuItem
                className="cursor-pointer p-3 text-sm"
                onClick={() => setLabel("Save as Draft")}
              >
                Save as Draft
              </MenuItem>
            </Menu>
          </ActionDropdown>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
