import React from "react";

import PostCard from "./PostCard";

const Posts = ({ data }) => (
  <div className="ml-14 flex flex-col gap-10">
    {data.map(({ id, title, description, created_at }) => (
      <PostCard
        date={created_at}
        key={id}
        preview={description}
        title={title}
      />
    ))}
  </div>
);

export default Posts;
