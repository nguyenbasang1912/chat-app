import http from '../configs/http';
import {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
  RenewTokensResponse,
  UpdateFcmResponse,
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

const updateFcm = async (body: {fcmToken: string}) => {
  return await http.post<{fcmToken: string}, UpdateFcmResponse>(
    '/api/auth/update-fcm',
    body,
  );
};

const logout = async () => {
  return await http.post('/api/auth/logout');
};

const renewTokens = async (body: {refreshToken: string}) => {
  return await http.post<{refreshToken: string}, RenewTokensResponse>(
    '/api/auth/renew-tokens',
    body,
  );
};

export {login, register, updateFcm, logout, renewTokens};
