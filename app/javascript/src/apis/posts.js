import axios from "axios";

const fetch = params => axios.get(`/posts?${params.toString()}`);

const fetchUserPosts = params =>
  axios.get(`/posts/my_posts?${params.toString()}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload, quiet }) => {
  const path = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  axios.put(path, {
    post: payload,
  });
};

const destroy = ({ slug, quiet }) => {
  const path = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.delete(path);
};

const postsApi = { fetch, create, show, update, fetchUserPosts, destroy };

export default postsApi;
