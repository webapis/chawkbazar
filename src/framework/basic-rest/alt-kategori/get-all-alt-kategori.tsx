import { AltKategorilerQueryOptionsType, AltKategori } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchAltKategoriler = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.ALTKATEGORILER);
  debugger
  return { altkategoriler: { data: data as AltKategori[] } };
};



export const useAltKategorilerQuery = (options: AltKategorilerQueryOptionsType) => {

  return useQuery<{ altkategoriler: { data: AltKategori[] } }, Error>([API_ENDPOINTS.ALTKATEGORILER, options], fetchAltKategoriler);
};
