import api from "./api";

export const getSettings = async () => {
  const { data } = await api.get("/settings");
  return data?.data || [];
};

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data?.data || [];
};

export const getFooter = async () => {
  const { data } = await api.get("/footer-and-social-links");
  return data?.data || {};
};

export const sendContactUs = async (formData) => {
  const { data } = await api.post(`/contact`, formData);
  return data?.data || [];
};

export const getContactInformation = async () => {
  const { data } = await api.get(`/contact-information`);
  return data?.data || [];
};

export const getLocationSliders = async () => {
  const { data } = await api.get(`/sliders`);
  return data?.data || [];
};
