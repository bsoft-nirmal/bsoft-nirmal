import axios from '../axios.config';
import type { ApiResponse, PaginatedResult } from '@models/common.types';
import type { User } from '@models/user.types';

export const getUsers = () => axios.get<ApiResponse<PaginatedResult<User>>>('/users');
export const getUserById = (id: string) => axios.get<ApiResponse<User>>(`/users/${id}`);
export const updateUser = (id: string, data: Partial<User>) =>
  axios.put<ApiResponse<User>>(`/users/${id}`, data);
