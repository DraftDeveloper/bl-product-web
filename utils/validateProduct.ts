import { ProductForm } from '@/types/product';

export function validateProduct(form: ProductForm): string[] {
  const errors: string[] = [];

  const requiredString = (
    value: string,
    max: number,
    label: string
  ) => {
    if (!value.trim()) {
      errors.push(`${label} is required`);
    } else if (value.length > max) {
      errors.push(`${label} must be ≤ ${max} characters`);
    }
  };

  const optionalString = (
    value: string | undefined,
    max: number,
    label: string
  ) => {
    if (value && value.length > max) {
      errors.push(`${label} must be ≤ ${max} characters`);
    }
  };

  const optionalNumber = (
    value: number | undefined,
    label: string
  ) => {
    if (value !== undefined && Number.isNaN(value)) {
      errors.push(`${label} must be a number`);
    }
  };

  /* ===== Required ===== */
  requiredString(form.sku, 50, 'SKU');
  requiredString(form.sku_name, 200, 'Product Name');
  requiredString(form.barcode, 50, 'Barcode');

  if (form.packsize <= 0) {
    errors.push('Pack Size must be greater than 0');
  }

  /* ===== Optional ===== */
  optionalString(form.color, 100, 'Color');
  optionalString(form.size, 100, 'Size');
  optionalString(form.brand, 100, 'Brand');
  optionalString(form.style_code, 30, 'Style Code');
  optionalString(form.color_code, 30, 'Color Code');
  optionalString(form.uom, 30, 'Unit of Measure');
  optionalString(form.skuid, 25, 'SKU Reference ID');
  optionalString(form.sup_code, 25, 'Supplier Code');
  optionalString(form.sup_name, 200, 'Supplier Name');

  optionalNumber(form.weight, 'Weight');
  optionalNumber(form.dim_w, 'Width');
  optionalNumber(form.dim_l, 'Length');
  optionalNumber(form.dim_h, 'Height');

  return errors;
}
