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
    <div className="mx-14 flex flex-col gap-8">
      {filteredData.map(
        ({
          id,
          title,
          updated_at,
          slug,
          categories,
          user,
          upvotes,
          downvotes,
        }) => (
          <PostCard
            categories={categories}
            date={updated_at}
            downvotes={downvotes}
            key={id}
            slug={slug}
            title={title}
            upvotes={upvotes}
            user={user}
          />
        )
      )}
    </div>
  );
};

export default Posts;
