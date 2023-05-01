import { KategorilerQueryOptionsType, Kategori } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchKategoriler = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.KATEGORILER);
  return { kategoriler: { data: data as Kategori[] } };
};



export const useKategorilerQuery = (options: KategorilerQueryOptionsType) => {

  return useQuery<{ kategoriler: { data: Kategori[] } }, Error>([API_ENDPOINTS.KATEGORILER, options], fetchKategoriler);
};
