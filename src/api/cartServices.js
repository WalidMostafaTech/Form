import api from "./api";

export const getCartHero = async () => {
  const { data } = await api.get(`/orders/hero/section`);

  return data?.data || [];
};
