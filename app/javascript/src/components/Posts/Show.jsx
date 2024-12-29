import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import postsApi from "apis/posts";
import { PageLoader, Container, PageTitle } from "components/commons";

import AuthorCard from "./AuthorCard";
import CategoryTags from "./CategoryTags";

const Show = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);

      setLoading(false);
      setPost(post);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const { title, description, categories, created_at, user } = post;

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="relative left-14 top-24">
          <CategoryTags {...{ categories }} />
        </div>
        <PageTitle title={title} />
        <AuthorCard date={created_at} {...{ user }} />
        <p className="mx-16 whitespace-pre-wrap text-lg">{description}</p>
      </div>
    </Container>
  );
};

export default Show;
