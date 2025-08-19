import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
};

const userIdSlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    removeUserId(state) {
      state.userId = null;
    },
  },
});

export const { setUserId, removeUserId } = userIdSlice.actions;

// Selector function to select the userId from the state
export const selectUserId = (state) => state.userId.userId;

export default userIdSlice.reducer;

export const setUserIdAction = (userId) => (dispatch) => {
  dispatch(setUserId(userId));
  localStorage.setItem('userId', userId);
};

export const removeUserIdAction = () => (dispatch) => {
  dispatch(removeUserId());
  localStorage.removeItem('userId');
};
