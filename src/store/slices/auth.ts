import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginThunk, updateFcmThunk} from '../thunks/auth';
import {RenewTokensResponse} from '../../apis/types/auth';

const initialState = {
  user: {
    userId: '',
    username: '',
    fullname: '',
    fcmToken: '',
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
  reducers: {
    logout: state => {
      state.status.loading = false;
      state.tokens.accessToken = '';
      state.tokens.refreshToken = '';
      state.user.fcmToken = '';
      state.user.userId = '';
      state.user.username = '';
      state.user.fullname = '';
    },
    renewTokens: (
      state,
      action: PayloadAction<RenewTokensResponse['data']>,
    ) => {
      console.log(action.payload);
      state.tokens.accessToken = action.payload.accessToken;
      state.tokens.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: buider => {
    buider
      .addCase(loginThunk.pending, state => {
        state.status.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status.loading = false;
        state.user.fcmToken = action.payload.data.user.fcmToken;
        state.user.fullname = action.payload.data.user.fullname;
        state.user.userId = action.payload.data.user.userId;
        state.user.username = action.payload.data.user.username;
        state.tokens.accessToken = action.payload.data.tokens.accessToken;
        state.tokens.refreshToken = action.payload.data.tokens.refreshToken;
      })
      .addCase(loginThunk.rejected, state => {
        state.status.loading = false;
      })
      .addCase(updateFcmThunk.fulfilled, (state, action) => {
        state.user.fcmToken = action.payload.data;
      });
  },
});

export const authReducer = authSlice.reducer;
export const {logout, renewTokens} = authSlice.actions;
