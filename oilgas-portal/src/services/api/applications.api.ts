import axios from '../axios.config';
import type { ApiResponse, PaginatedResult } from '@models/common.types';
import type { Application } from '@models/application.types';

export const getApplications = (bidId?: string) =>
  axios.get<ApiResponse<PaginatedResult<Application>>>('/applications', { params: { bidId } });

export const getApplicationById = (id: string) =>
  axios.get<ApiResponse<Application>>(`/applications/${id}`);

export const updateApplication = (id: string, data: Partial<Application>) =>
  axios.put<ApiResponse<Application>>(`/applications/${id}`, data);
