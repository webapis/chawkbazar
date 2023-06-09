import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};
export type KategorilerQueryOptionsType = {
  text?: string;
  kategiri?: string;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};
export type AltKategorilerQueryOptionsType = {
  text?: string;
  altkategori?: string;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};
export type GendersQueryOptionsType = {
  text?: string;
  gender?: string;
  status?: string;
  // limit?: number;
  // demoVariant?: 'ancient';
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  start?:number;
  demoVariant?: 'ancient';
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Kategori = {
  id: number | string;
  name: string;
  slug: string;
  gender?: [];
  details?: string;
  image?: Attachment;
  icon?: string;
  kategoriler?: Kategori[];
  productCount?: number;

};
export type AltKategori = {
  id: number | string;
  groupname: string;
  name: string;
  slug: string;
  kategoriler:string[];
  altkategoriler?: AltKategori[];
};
export type Gender = {
  id: number | string;
  name: string;
  slug: string;
  // details?: string;
  // image?: Attachment;
  // icon?: string;
  // genders?: Gender[];
  // genderCount?: number;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  gender:string[];
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  variations?: object;
  [key: string]: unknown;
  isNewArrival?: boolean;
  link: string
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};
