import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async status => {
    try {
      setLoading(true);
      const category_ids = selectedCategories.map(obj => obj.value);
      await postsApi.update({
        slug,
        payload: { title, description, category_ids, status },
      });
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = label => {
    let status;
    if (label === "Publish") {
      status = "published";
    } else {
      status = "draft";
    }
    handleSubmit(status);
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: {
          post: { title, description, categories },
        },
      } = await postsApi.show(slug);
      setTitle(title);
      setDescription(description);
      setSelectedCategories(
        categories.map(obj => ({ value: obj.id, label: obj.name }))
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle
          showDropdown
          handleClick={handleClick}
          history={history}
          title="Edit blog post"
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

export default Edit;
