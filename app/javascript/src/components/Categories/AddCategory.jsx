import React, { useState } from "react";

import { Input, Modal, Button } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";

const AddCategory = ({ isModalVisible, setToggleRerender, onClose }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const createCategory = async () => {
    try {
      setLoading(true);
      await categoriesApi.create({ name });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
      setToggleRerender(prev => !prev);
      setName("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isModalVisible} {...{ onClose }}>
      <div className="flex flex-col gap-4 p-6">
        <h3>New category</h3>
        <Input
          label="Category title"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <div className="flex gap-3">
          <Button
            className="neetix-button--primary"
            label="Create"
            loading={loading}
            size="medium"
            type="submit"
            onClick={() => createCategory()}
          />
          <Button
            label="Cancel"
            size="medium"
            style="tertiary"
            onClick={() => onClose()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddCategory;
