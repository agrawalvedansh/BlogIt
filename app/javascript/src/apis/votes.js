import axios from "axios";

const create = payload =>
  axios.post("/votes", {
    vote: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`/votes/${id}`, {
    vote: payload,
  });

const votesApi = { create, update };

export default votesApi;
