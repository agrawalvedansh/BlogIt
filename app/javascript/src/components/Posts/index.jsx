import React from "react";

import PostCard from "./PostCard";

const Posts = ({ data }) => (
  <div className="mx-14 flex flex-col gap-10">
    {data.map(({ id, title, description, created_at, slug }) => (
      <PostCard
        date={created_at}
        key={id}
        preview={description}
        slug={slug}
        title={title}
      />
    ))}
  </div>
);

export default Posts;
