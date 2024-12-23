import React, { useState } from "react";

import postsApi from "apis/posts";
import { PageTitle, Container } from "components/commons";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await postsApi.create({ title, description });
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <Form
          {...{
            title,
            setTitle,
            description,
            setDescription,
            loading,
            handleSubmit,
          }}
        />
      </div>
    </Container>
  );
};

export default Create;
