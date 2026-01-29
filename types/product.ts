export type ProductType = '01' | '02' | '03';
export type PackingStage = '01' | '02' | '03';
export type Temperature = '0' | '1';
export type ProductIs = '0' | '1';

export interface BlProductItem {
  mchid: string;
  sku: string;
  sku_name: string;
  barcode: string;
  packsize: number;

  product_type?: ProductType;
  packing_stage?: PackingStage;

  weight?: number;
  dim_w?: number;
  dim_l?: number;
  dim_h?: number;

  color?: string;
  size?: string;
  brand?: string;
  style_code?: string;
  color_code?: string;
  uom?: string;
  skuid?: string;
  shopid?: string;

  sup_code?: string;
  sup_name?: string;
  temperature?: Temperature;
  product_is?: ProductIs;
}

export interface BlProductListResponse {
  productitems: BlProductItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_page: number;
  };
  code: '0' | '1';
  message: string;
  request_id: string;
}

export interface BlProductUpsertRequest {
  mchid: string;
  sku: string;
  sku_name: string;
  barcode: string;
  packsize: number;

  product_type?: ProductType;
  packing_stage?: PackingStage;

  weight?: number;
  dim_w?: number;
  dim_l?: number;
  dim_h?: number;

  color?: string;
  size?: string;
  brand?: string;
  style_code?: string;
  color_code?: string;
  uom?: string;
  skuid?: string;

  sup_code?: string;
  sup_name?: string;
  temperature?: Temperature;
  product_is?: ProductIs;
}

export interface BlBaseResponse {
  code: '0' | '1';
  message: string;
  request_id?: string;
}

export interface ProductForm {
  sku: string;
  sku_name: string;
  barcode: string;
  packsize: number;

  product_type: ProductType;
  packing_stage: PackingStage;

  weight: number;
  dim_w: number;
  dim_l: number;
  dim_h: number;

  color: string;
  size: string;
  brand: string;
  style_code: string;
  color_code: string;
  uom: string;

  skuid: string;
  sup_code: string;
  sup_name: string;

  temperature: Temperature;
  product_is: ProductIs;
}