import {createAsyncThunk} from '@reduxjs/toolkit';
import {login, register} from '../../apis/auth';

const loginThunk = createAsyncThunk('auth/login', login);
const registerThunk = createAsyncThunk('auth/register', register);

export {loginThunk, registerThunk};
