import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import postsApi from "apis/posts";
import { Container, PageTitle, PageLoader } from "components/commons";
import Posts from "components/Posts";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          No blog posts to show.
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Blog Posts" />
        <Posts data={posts} />
      </div>
    </Container>
  );
};

export default Dashboard;
