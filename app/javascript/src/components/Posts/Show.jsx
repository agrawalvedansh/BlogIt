import React, { useState, useEffect } from "react";

import { Modal } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";

import postsApi from "apis/posts";
import { PageLoader, Container, PageTitle } from "components/commons";
import { getFromLocalStorage } from "utils/storage";
import stringTruncator from "utils/stringUtils";

import AuthorCard from "./AuthorCard";
import CategoryTags from "./CategoryTags";
import DownloadReport from "./DownloadReport";

const Show = ({ history }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { slug } = useParams();

  const userId = getFromLocalStorage("authUserId");

  const updatePost = () => {
    history.push(`/posts/${post.slug}/edit`);
  };

  const handleDownload = () => {
    setIsModalVisible(true);
  };

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

  const { title, description, categories, updated_at, user, status } = post;

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="relative left-14 top-24">
          <CategoryTags {...{ categories }} />
        </div>
        <PageTitle
          showDownloadButton
          buttonLabel="Edit Post"
          handleClick={updatePost}
          handleDownload={handleDownload}
          showButton={userId === user.id}
          showDraftTag={status === "draft"}
          title={stringTruncator(title)}
        />
        <AuthorCard date={updated_at} {...{ user }} />
        <p className="mx-16 whitespace-pre-wrap text-lg">{description}</p>
      </div>
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <DownloadReport onClose={() => setIsModalVisible(false)} />
      </Modal>
    </Container>
  );
};

export default Show;
