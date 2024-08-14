import http from '../configs/http';
import {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from './types/auth';

const login = async (body: LoginBody) => {
  return await http.post<LoginBody, LoginResponse>('/api/auth/login', body);
};

const register = async (body: RegisterBody) => {
  return await http.post<RegisterBody, RegisterResponse>(
    '/api/auth/register',
    body,
  );
};

export {login, register};
