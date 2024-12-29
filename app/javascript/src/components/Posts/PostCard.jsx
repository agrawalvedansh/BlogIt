import React from "react";

import { Link } from "react-router-dom";
import { parseDate } from "src/utils/dateUtils";

import CategoryTags from "./CategoryTags";

const PostCard = ({ title, preview, date, slug, categories, user }) => {
  const { day, monthName, year } = parseDate(date);

  return (
    <div className="h-24">
      <Link className="text-2xl font-semibold" to={`/posts/${slug}/show`}>
        {title}
      </Link>
      <CategoryTags {...{ categories }} />
      <p className="line-clamp-2">{preview}</p>
      <p className="mb-1 mt-3 text-xs font-semibold text-slate-600">
        {user.name}
      </p>
      <p className="border-b-2 pb-2 text-xs text-slate-400">
        {day} {monthName} {year}
      </p>
    </div>
  );
};

export default PostCard;
