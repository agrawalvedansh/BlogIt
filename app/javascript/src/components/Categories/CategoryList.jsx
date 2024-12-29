import React from "react";

import classNames from "classnames";

const CategoryList = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  searchKey,
}) => {
  categories = categories.filter(({ name }) =>
    name.toLowerCase().includes(searchKey.toLowerCase())
  );

  const handleClick = id => {
    setSelectedCategories(prevSet => {
      const newSet = new Set(prevSet);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  return (
    <div className="my-4 flex h-full flex-col gap-2 overflow-auto">
      {categories.map(({ id, name }) => (
        <div
          key={id}
          className={classNames("cursor-pointer rounded-sm border-2 p-1", {
            "bg-white": selectedCategories.has(id),
            "border-gray-300": !selectedCategories.has(id),
          })}
          onClick={() => handleClick(id)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
