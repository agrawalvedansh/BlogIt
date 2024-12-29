import React from "react";

import { Tag } from "@bigbinary/neetoui";

const CategoryTags = ({ categories }) => (
  <div className="mb-4 mt-1 flex gap-1">
    {categories.map(({ id, name }) => (
      <Tag key={id} label={name} style="primary" type="solid" />
    ))}
  </div>
);

export default CategoryTags;
