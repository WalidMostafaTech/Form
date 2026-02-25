import api from "./api";

export const getHome = async () => {
  const { data } = await api.get("/home");
  return data?.data || {};
};
