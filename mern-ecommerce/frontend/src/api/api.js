import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/*API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});*/
// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const fetchProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const addProduct = (productData) => API.post("/products", productData);
export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getCart = () => API.get("/cart");
export const addToCart = (productId, quantity) =>
  API.post("/cart", { productId, quantity });
export const updateCartItem = (itemId, quantity) =>
  API.put(`/cart/${itemId}`, { quantity });
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);

export const placeOrder = (orderData) => API.post("/orders", orderData);
// إضافة طلب جديد
export const createOrder = (orderData) => API.post("/orders", orderData);

// جلب جميع الطلبات للمستخدم
export const getOrders = () => API.get("/orders");

// جلب طلب محدد
export const getOrderById = (orderId) => API.get(`/orders/${orderId}`);
