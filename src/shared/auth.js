const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_ADMIN_KEY = 'auth_admin';

export const auth = {
  getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),

  setToken: (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getAdmin: () => {
    const admin = localStorage.getItem(AUTH_ADMIN_KEY);
    return admin ? JSON.parse(admin) : null;
  },

  setAdmin: (admin) => {
    localStorage.setItem(AUTH_ADMIN_KEY, JSON.stringify(admin));
  },

  clear: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_ADMIN_KEY);
  },

  isAuthenticated: () => !!localStorage.getItem(AUTH_TOKEN_KEY),

  getAuthHeader: () => {
    const token = auth.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};