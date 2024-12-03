/**
 * token工具
 */
const key = 'LOGIN_TOKEN';

export const getToken = () => {
  const token = localStorage.getItem(key);
  return token;
};

export const setToken = (data: string) => {
  return localStorage.setItem(key, data);
};

export const removeToken = () => {
  return localStorage.removeItem(key);
};
