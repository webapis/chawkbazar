import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {

	const [_key, _params] = queryKey;
	console.log('_params', _params)
	console.log('_key', _key)
	const { data } = await http.get(_key + _params);


	debugger

	return {
		data: shuffle(data.data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
}

const useProductsQuery = (options: QueryOptionsType) => {

	debugger
	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	)
}

export { useProductsQuery, fetchProducts };
