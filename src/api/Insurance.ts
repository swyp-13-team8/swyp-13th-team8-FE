import type { ApiResponse } from '../type/apiType';
import type { InsurancesResponse } from '../type/responseType';
import api from './axios.ts';

export const getInsuranceList = async () => {
  const res = await api.get<ApiResponse<InsurancesResponse[]>>('/insurance/list');
  console.log(res);
  return res.data;
};
