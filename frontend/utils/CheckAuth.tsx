import Cookies from 'js-cookie';

export const checkAuth = () => {
  const token = Cookies.get('token');

  return !!token; // Mengembalikan true jika token tersedia, false jika tidak
};

export const removeToken = () => {
  Cookies.remove('token');
  Cookies.remove('id');
};