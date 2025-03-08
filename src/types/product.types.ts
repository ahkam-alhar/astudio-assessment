import { IResponse } from './common.types';

export interface IProductResponse extends IResponse {
  products: IProduct[];
}

export interface IProductTable extends IProduct {
  reviewCount: number;
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

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
