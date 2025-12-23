export const parseVND = (value) =>
  Number(String(value).replace(/[^\d]/g, "")) || 0;

export const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(parseVND(value));

export const isImageUrl = (url) =>
  typeof url === "string" &&
  (url.startsWith("http") || url.match(/\.(jpg|jpeg|png|webp)$/i));
