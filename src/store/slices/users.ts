import {createSlice} from '@reduxjs/toolkit';
import {getAllUsersThunk} from '../thunks/users';
import {GetAllUsersResponse} from '../../apis/types/user';
import deduplicate from '../../utils/deduplicate';

type UsersType = {
  users: {
    _id: string;
    fullname: string;
    username: string;
    fcm_token: string;
  }[];
  page: GetAllUsersResponse['data']['page'];
};

const initialState: UsersType = {
  users: [],
  page: {
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetListUsers: state => {
      state.users = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.users = deduplicate([...state.users, ...action.payload.data.users]);
      state.page = action.payload.data.page;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const {resetListUsers} = usersSlice.actions;
