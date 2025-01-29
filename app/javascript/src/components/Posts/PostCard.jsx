import React from "react";

import { UpArrow, DownArrow } from "@bigbinary/neeto-icons";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { parseDate } from "src/utils/dateUtils";

import votesApi from "apis/votes";

import CategoryTags from "./CategoryTags";

const PostCard = ({
  id,
  title,
  date,
  slug,
  categories,
  user,
  upvotes,
  downvotes,
  userVote,
  fetchVotes,
  fetchPosts,
}) => {
  const { day, monthName, year } = parseDate(date);

  const handleVote = async is_upvote => {
    if (userVote === undefined) {
      await votesApi.create({ post_id: id, is_upvote });
    } else {
      await votesApi.update({ id, payload: { is_upvote } });
    }
    fetchVotes();
    fetchPosts();
  };

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
          onClick={() => handleVote(true)}
        />
        <div className="text-xl font-bold">
          {Number(upvotes) - Number(downvotes)}
        </div>
        <DownArrow
          size={30}
          className={classnames("cursor-pointer", {
            "text-red-500": userVote === false,
          })}
          onClick={() => handleVote(false)}
        />
      </div>
    </div>
  );
};

export default PostCard;
