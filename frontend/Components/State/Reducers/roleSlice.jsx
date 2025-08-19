// roleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;

// Selector function to select the role from the state
export const selectRole = (state) => state.role.role;

export default roleSlice.reducer;

export const setRoleAction = (role) => (dispatch) => {
  dispatch(setRole(role));
  localStorage.setItem('role', role);
};
