import axios from "axios";

const fetch = () => axios.get("/votes");

const create = payload =>
  axios.post("/votes", {
    vote: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`/votes/${id}`, {
    vote: payload,
  });

const votesApi = { create, update, fetch };

export default votesApi;
