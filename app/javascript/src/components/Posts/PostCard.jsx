import React from "react";

import { Link } from "react-router-dom";
import { parseDate } from "src/utils/dateUtils";

const PostCard = ({ title, preview, date, slug }) => {
  const { day, monthName, year } = parseDate(date);

  return (
    <div className="h-24">
      <Link className="text-2xl font-semibold" to={`/posts/${slug}/show`}>
        {title}
      </Link>
      <p className="line-clamp-2">{preview}</p>
      <p className="mt-3 border-b-2 py-2 text-xs text-slate-400">
        {day} {monthName} {year}
      </p>
    </div>
  );
};

export default PostCard;
