import React, { useState, useEffect } from "react";

import { Input, Textarea, Select } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";
import { PageLoader } from "components/commons";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedCategories,
  setSelectedCategories,
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

  const options = categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <div className="mx-14 flex flex-col gap-8 rounded-xl border-2 px-14 py-6">
      <Input
        required
        label="Title"
        maxLength={125}
        placeholder="Enter title"
        value={title}
        onChange={event => setTitle(event.target.value.slice(0, 125))}
      />
      <Select
        {...{ options }}
        isMulti
        required
        label="Category"
        placeholder="Search category"
        value={selectedCategories}
        onChange={handleChange}
      />
      <Textarea
        required
        label="Description"
        maxLength={10000}
        placeholder="Enter description"
        value={description}
        onChange={event => setDescription(event.target.value.slice(0, 10000))}
      />
    </div>
  );
};

export default Form;
