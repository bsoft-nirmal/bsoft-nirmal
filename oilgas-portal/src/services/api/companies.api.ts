import axios from '../axios.config';
import type { ApiResponse, PaginatedResult } from '@models/common.types';
import type { User } from '@models/user.types';

export const getCompanies = () => axios.get<ApiResponse<PaginatedResult<User>>>('/companies');
export const getCompanyById = (id: string) => axios.get<ApiResponse<User>>(`/companies/${id}`);
