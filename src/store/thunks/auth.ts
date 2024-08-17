import {createAsyncThunk} from '@reduxjs/toolkit';
import {login, register, updateFcm} from '../../apis/auth';

const loginThunk = createAsyncThunk('auth/login', login);
const registerThunk = createAsyncThunk('auth/register', register);
const updateFcmThunk = createAsyncThunk('auth/fcm', updateFcm);

export {loginThunk, registerThunk, updateFcmThunk};
