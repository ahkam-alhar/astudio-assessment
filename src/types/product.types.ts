import { FilterParams, IResponse } from './common.types';

export interface IProductResponse extends IResponse {
  products: IProduct[];
}

export interface IProductTable extends IProduct {
  reviewCount: number;
}

export interface ProductFilterParams extends FilterParams {
  category?: string;
}

export interface ProductCategoryResponse {
  slug: string;
  name: string;
  url: string;
}

export interface IProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number | string;
  rating: number;
  stock: number;
  brand?: string;
  sku: string;
  warrantyInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  minimumOrderQuantity: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
