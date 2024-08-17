import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../apis/user";

const getAllUsersThunk = createAsyncThunk('users/all', getAllUsers)

export {
  getAllUsersThunk
}