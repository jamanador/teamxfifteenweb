import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const user = localStorage.getItem('team_x_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  return localStorage.getItem('team_x_token') || null;
};

const initialState = {
  user: getInitialUser(),
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, token } = action.payload;
      const finalToken = accessToken || token;
      state.user = user;
      state.token = finalToken;
      state.isAuthenticated = true;

      if (finalToken) {
        localStorage.setItem('team_x_token', finalToken);
      }
      if (user) {
        localStorage.setItem('team_x_user', JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('team_x_token');
      localStorage.removeItem('team_x_user');
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('team_x_user', JSON.stringify(state.user));
    },
  },
});

export const { setCredentials, logout, updateUserProfile } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';

export default authSlice.reducer;
