import axios from '../axios.config';
import type { ApiResponse } from '@models/common.types';
import type { User } from '@models/user.types';

export interface SignInDTO { email: string; password: string }
export interface SignUpDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: User['role'];
}

export const signIn = (data: SignInDTO) => axios.post<ApiResponse<{ token: string; user: User }>>('/auth/signin', data);
export const signUp = (data: SignUpDTO) => axios.post<ApiResponse<{ token: string; user: User }>>('/auth/signup', data);
export const me = () => axios.get<ApiResponse<User>>('/auth/me');
