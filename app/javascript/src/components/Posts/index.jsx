import React, { useState, useEffect } from "react";

import votesApi from "apis/votes";
import { PageLoader } from "components/commons";

import PostCard from "./PostCard";

const Posts = ({ data, selectedCategories }) => {
  const [votesMap, setVotesMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchVotes = async () => {
    try {
      const {
        data: { votes },
      } = await votesApi.fetch();

      const voteMap = votes.reduce((acc, vote) => {
        acc[vote.id] = vote.is_upvote;

        return acc;
      }, {});
      setVotesMap(voteMap);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const filteredData =
    selectedCategories.size === 0
      ? data
      : data.filter(({ categories }) =>
          categories.some(({ id }) => selectedCategories.has(id))
        );

  useEffect(() => {
    fetchVotes();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
            postId={id}
            slug={slug}
            title={title}
            upvotes={upvotes}
            user={user}
            userVote={votesMap[id]}
          />
        )
      )}
    </div>
  );
};

export default Posts;
