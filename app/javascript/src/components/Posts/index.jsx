import React from "react";

import PostCard from "./PostCard";

const Posts = ({ data, selectedCategories }) => {
  const filteredData =
    selectedCategories.size === 0
      ? data
      : data.filter(({ categories }) =>
          categories.some(({ id }) => selectedCategories.has(id))
        );

  return (
    <div className="mx-14 flex flex-col gap-20">
      {filteredData.map(
        ({ id, title, description, created_at, slug, categories, user }) => (
          <PostCard
            categories={categories}
            date={created_at}
            key={id}
            preview={description}
            slug={slug}
            title={title}
            user={user}
          />
        )
      )}
    </div>
  );
};

export default Posts;
