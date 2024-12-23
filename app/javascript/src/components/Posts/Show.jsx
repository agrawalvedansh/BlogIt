import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import postsApi from "apis/posts";
import { PageLoader, Container, PageTitle } from "components/commons";

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

  const { title, description } = post;

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title={title} />
        <p className="mx-16 whitespace-pre-wrap text-lg">{description}</p>
      </div>
    </Container>
  );
};

export default Show;
