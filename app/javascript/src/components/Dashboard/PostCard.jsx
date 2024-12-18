import React from "react";

import { parseDate } from "../../utils/dateUtils";

const PostCard = ({ title, preview, date }) => {
  const { day, monthName, year } = parseDate(date);

  return (
    <div className="h-24 w-4/5 border-b-2">
      <h4 className="text-2xl font-semibold">{title}</h4>
      <p className="line-clamp-2">{preview}</p>
      <p className="mt-3 text-xs text-slate-400">
        {day} {monthName} {year}
      </p>
    </div>
  );
};

export default PostCard;
