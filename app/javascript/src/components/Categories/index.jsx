import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui";
import classNames from "classnames";

import categoriesApi from "apis/categories";
import { PageLoader } from "components/commons";

import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";

const Categories = ({ selectedCategories, setSelectedCategories }) => {
  const [searchKey, setSearchKey] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toggleRerender, setToggleRerender] = useState(true);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [toggleRerender]);

  if (loading) {
    return <PageLoader />;
  }

  const handleChange = event => {
    setSearchKey(event.target.value);
  };

  return (
    <div className="z-20 h-screen w-56 border-b bg-gray-200 px-4 py-10">
      <div className="items-bottom flex">
        <h5>CATEGORIES</h5>
        <Search
          className="ml-auto mr-1 cursor-pointer"
          size={20}
          onClick={() => setShowInput(!showInput)}
        />
        <Plus
          className="cursor-pointer"
          size={20}
          onClick={() => setIsModalVisible(true)}
        />
        <AddCategory
          {...{ isModalVisible, setToggleRerender }}
          onClose={() => setIsModalVisible(false)}
        />
      </div>
      <Input
        placeholder="Search"
        size="small"
        value={searchKey}
        className={classNames("mt-2", {
          hidden: !showInput,
        })}
        onChange={handleChange}
      />
      <CategoryList
        {...{
          categories,
          selectedCategories,
          setSelectedCategories,
          searchKey,
        }}
      />
    </div>
  );
};

export default Categories;
