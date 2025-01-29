import React from "react";

import { UpArrow, DownArrow } from "@bigbinary/neeto-icons";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { parseDate } from "src/utils/dateUtils";

import CategoryTags from "./CategoryTags";

const PostCard = ({
  title,
  date,
  slug,
  categories,
  user,
  upvotes,
  downvotes,
  userVote,
}) => {
  const { day, monthName, year } = parseDate(date);

  const handleUpvote = () => {};

  const handleDownvote = () => {};

  return (
    <div className="flex h-32 items-center justify-between border-b-2">
      <div>
        <Link className="text-2xl font-semibold" to={`/posts/${slug}/show`}>
          {title}
        </Link>
        <CategoryTags {...{ categories }} />
        <p className="mb-1 mt-3 text-xs font-semibold text-slate-600">
          {user.name}
        </p>
        <p className="pb-2 text-xs text-slate-400">
          {day} {monthName} {year}
        </p>
      </div>
      <div className="mr-20 flex flex-col items-center gap-2">
        <UpArrow
          size={30}
          className={classnames("cursor-pointer", {
            "text-red-500": userVote === true,
          })}
          onClick={handleUpvote}
        />
        <div className="text-xl font-bold">
          {Number(upvotes) - Number(downvotes)}
        </div>
        <DownArrow
          size={30}
          className={classnames("cursor-pointer", {
            "text-red-500": userVote === false,
          })}
          onClick={handleDownvote}
        />
      </div>
    </div>
  );
};

export default PostCard;
