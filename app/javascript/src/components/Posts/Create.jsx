import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { PageTitle, Container } from "components/commons";
import { setCreateDraft, getCreateDraft } from "utils/storage";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const category_ids = selectedCategories.map(obj => obj.value);
      await postsApi.create({ title, description, category_ids });
      localStorage.removeItem("/create");
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    const draft = getCreateDraft();
    if (draft === null) {
      return;
    }
    const { title, description, selectedCategories } = draft;
    setTitle(title);
    setDescription(description);
    setSelectedCategories(selectedCategories);
  }, []);

  const handleSaveAsDraft = () => {
    setCreateDraft({ title, description, selectedCategories });
    history.push("/");
  };

  const handleClick = label => {
    if (label === "Publish") {
      handleSubmit();
    } else {
      handleSaveAsDraft();
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
