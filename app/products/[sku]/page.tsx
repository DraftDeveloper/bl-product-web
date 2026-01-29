'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import ProductForm from '@/app/components/product/ProductForm';
import { ProductForm as ProductFormType } from '@/types/product';
import { validateProduct } from '@/utils/validateProduct';

function mapApiToProductForm(api: Partial<ProductFormType>): ProductFormType {
  return {
    sku: api.sku ?? '',
    sku_name: api.sku_name ?? '',
    barcode: api.barcode ?? '',
    packsize: api.packsize ?? 1,

    product_type: api.product_type ?? '01',
    packing_stage: api.packing_stage ?? '01',

    weight: api.weight ?? 0,
    dim_w: api.dim_w ?? 0,
    dim_l: api.dim_l ?? 0,
    dim_h: api.dim_h ?? 0,

    color: api.color ?? '',
    size: api.size ?? '',
    brand: api.brand ?? '',
    style_code: api.style_code ?? '',
    color_code: api.color_code ?? '',
    uom: api.uom ?? '',

    skuid: api.skuid ?? '',
    sup_code: api.sup_code ?? '',   
    sup_name: api.sup_name ?? '',   

    temperature: api.temperature ?? '0',
    product_is: api.product_is ?? '0',
  };
}

export default function EditProductPage() {
  const router = useRouter();
  const { sku } = useParams<{ sku: string }>();
  const searchParams = useSearchParams();

  const raw = searchParams.get('data');
  const decoded = decodeProduct<Partial<ProductFormType>>(raw);
  const initialValue = decoded ? mapApiToProductForm(decoded) : null;

  if (!initialValue) {
    return (
      <div className="p-6 text-red-500">
        Invalid product data
      </div>
    );
  }

  async function handleUpdate(value: ProductFormType) {
    const errors = validateProduct(value);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    try {
      const res = await fetch('/api/products/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (!res.ok || data.code !== '0') {
        alert(data.message ?? 'Update failed');
        return;
      }

      alert('Update success');
      router.push('/products');
    } catch {
      alert('Network error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Product: {sku}
        </h1>

        <ProductForm
          mode="edit"
          initialValue={initialValue}
          onSubmit={handleUpdate}
          onBack={() => router.push('/products')}
        />
      </div>
    </div>
  );
}

function decodeProduct<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as T;
  } catch {
    return null;
  }
}
