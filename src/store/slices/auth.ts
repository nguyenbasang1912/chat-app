import {createSlice} from '@reduxjs/toolkit';
import {loginThunk} from '../thunks/auth';

const initialState = {
  user: {
    userId: '',
    username: '',
    fullname: '',
  },
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  status: {
    loading: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(loginThunk.pending, state => {
        state.status.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status.loading = false;
        state.user = action.payload.data.user;
        state.tokens = action.payload.data.tokens;
      })
      .addCase(loginThunk.rejected, state => {
        state.status.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
