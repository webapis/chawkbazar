import { GendersQueryOptionsType, Gender } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchGenders = async () => {

  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.GENDERS);

  return { genders: { data: data as Gender[] } };
};


export const useGendersQuery = (options: GendersQueryOptionsType) => {

  return useQuery<{ genders: { data: Gender[] } }, Error>([API_ENDPOINTS.GENDERS, options], fetchGenders);
};
