import api from "./api";

export const getFavorites = async () => {
  const { data } = await api.get("/favorites");
  return data?.data || [];
};

export const toggleFavorite = async ({ id, sale_type }) => {
  const { data } = await api.post("/favorites", { id, sale_type });
  return data?.data || null;
};
