import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import postsApi from "apis/posts";
import { Container, PageTitle, PageLoader } from "components/commons";
import Posts from "components/Posts";

const Dashboard = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const fetchPosts = async () => {
    const queryParams = new URLSearchParams();

    selectedCategories.forEach(category => {
      queryParams.append("category_ids[]", category.value);
    });
    try {
      const {
        data: { posts },
      } = await postsApi.fetch(queryParams);
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

  const handleClick = () => {
    history.push("/posts/create");
  };

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container {...{ selectedCategories, setSelectedCategories }}>
        <h1 className="my-5 text-center text-xl leading-5">
          No blog posts to show.
        </h1>
      </Container>
    );
  }

  return (
    <Container {...{ selectedCategories, setSelectedCategories }}>
      <div className="flex flex-col gap-y-8">
        <PageTitle
          showButton
          buttonLabel="Add a new blog post"
          handleClick={handleClick}
          title="Blog Posts"
        />
        <Posts data={posts} {...{ selectedCategories }} />
      </div>
    </Container>
  );
};

export default Dashboard;
