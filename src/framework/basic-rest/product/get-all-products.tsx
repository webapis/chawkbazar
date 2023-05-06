import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
//import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async ({ queryKey,pageParam=1 }: any) => {

	const [_key, _params] = queryKey;

	// console.log('pageParam-----', pageParam)
	// console.log('_params', Object.entries(_params).filter(f => f[0] !== 'limit').map(m => m[0] + '=' + m[1]).join('&'))
	// console.log('_key', _key)
	const url = Object.entries(_params).map(m => m[0] + '=' + m[1]).join('&')
	//const url =Object.entries( _params).filter(f=>f[0] !=='limit').map(m=> m[0]+'='+m[1]).join('&')
	const { data } = await http.get(_key + '?' + url+"&page="+pageParam);



	return {
		data: data.data,// shuffle(data.data),
		paginatorInfo: {
			nextPageUrl: '',
		
		},
	};
}


const useProductsQuery = (options: QueryOptionsType) => {


	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: (lastPage, pages) => lastPage.data.length===100? pages.length+1:undefined,
		}
	)
}


export { useProductsQuery, fetchProducts };
