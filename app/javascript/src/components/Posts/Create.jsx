import React, { useState } from "react";

import postsApi from "apis/posts";
import { PageTitle, Container } from "components/commons";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = async status => {
    try {
      setLoading(true);
      const category_ids = selectedCategories.map(obj => obj.value);
      await postsApi.create({
        title,
        description,
        category_ids,
        status,
      });
      localStorage.removeItem("/create");
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClick = label => {
    if (label === "Publish") {
      handleSubmit("Published");
    } else {
      handleSubmit("Draft");
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle
          showDropdown
          handleClick={handleClick}
          history={history}
          title="New blog post"
        />
        <Form
          {...{
            title,
            setTitle,
            description,
            setDescription,
            loading,
            handleSubmit,
            history,
            selectedCategories,
            setSelectedCategories,
          }}
        />
      </div>
    </Container>
  );
};

export default Create;
