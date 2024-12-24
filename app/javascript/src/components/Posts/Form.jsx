import React from "react";

import { Input, Textarea, Button } from "@bigbinary/neetoui";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  loading,
  handleSubmit,
  history,
}) => (
  <div className="mx-14 flex flex-col gap-8 rounded-xl border-2 px-14 py-6">
    <Input
      required
      label="Title"
      maxLength={125}
      placeholder="Enter title"
      value={title}
      onChange={event => setTitle(event.target.value.slice(0, 125))}
    />
    <Textarea
      required
      label="Description"
      maxLength={10000}
      placeholder="Enter description"
      value={description}
      onChange={event => setDescription(event.target.value.slice(0, 10000))}
    />
    <div className="flex flex-row-reverse gap-5">
      <Button
        className="neetix-button--primary"
        label="Submit"
        loading={loading}
        size="medium"
        type="submit"
        onClick={() => handleSubmit()}
      />
      <Button
        label="Cancel"
        size="medium"
        style="tertiary"
        onClick={() => history.push("/dashboard")}
      />
    </div>
  </div>
);

export default Form;
