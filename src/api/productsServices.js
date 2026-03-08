import api from "./api";

export const getProducts = async ({ category_id, sale_type, page = 1 }) => {
  const { data } = await api.get(`/products`, {
    params: {
      category_id,
      sale_type,
      page,
    },
  });

  return data?.data;
};

export const getProduct = async ({ slug, sale_type }) => {
  const { data } = await api.get(`/products/${slug}`, {
    params: { sale_type },
  });

  return data?.data || null;
};

export const getCategoriesHero = async () => {
  const { data } = await api.get(`/categories/hero/section`);

  return data?.data || [];
};

export const getProductsHero = async () => {
  const { data } = await api.get(`/products/hero/section`);

  return data?.data || [];
};
