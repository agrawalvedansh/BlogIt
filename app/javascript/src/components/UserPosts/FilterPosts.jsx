import React, { useState, useEffect } from "react";

import { Input, Select, Button } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";
import { PageLoader } from "components/commons";

const FilterPosts = ({
  title,
  setTitle,
  status,
  setStatus,
  selectedCategories,
  setSelectedCategories,
  setIsFiltered,
  setIsPaneVisible,
}) => {
  const [categories, setCategories] = useState([]);
  const [loadingForm, setLoadingForm] = useState(true);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoadingForm(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loadingForm) {
    return <PageLoader />;
  }

  const handleChange = selectedOptions => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleSelect = selectedOption => {
    setStatus(selectedOption || {});
  };

  const clearFilters = () => {
    setTitle("");
    setSelectedCategories([]);
    setStatus({});
    setIsFiltered(false);
    setIsPaneVisible(false);
  };

  const applyFilters = () => {
    setIsFiltered(true);
    setIsPaneVisible(false);
  };

  const options = categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <div className="flex flex-col gap-8 px-14 pb-6 pt-10">
      <h3>Filters</h3>
      <Input
        label="Title"
        maxLength={125}
        placeholder="Enter title"
        value={title}
        onChange={event => setTitle(event.target.value.slice(0, 125))}
      />
      <Select
        {...{ options }}
        isMulti
        label="Category"
        placeholder="Search category"
        value={selectedCategories}
        onChange={handleChange}
      />
      <Select
        label="Status"
        placeholder="Select placeholder"
        value={status}
        options={[
          {
            label: "Published",
            value: "published",
          },
          {
            label: "Unpublished",
            value: "draft",
          },
        ]}
        onChange={handleSelect}
      />
      <div className=" absolute bottom-4 flex gap-5">
        <Button
          className="neetix-button--primary px-7"
          label="Done"
          onClick={applyFilters}
        />
        <Button label="Clear Filters" style="tertiary" onClick={clearFilters} />
      </div>
    </div>
  );
};

export default FilterPosts;
