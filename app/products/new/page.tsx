'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/app/components/product/ProductForm';
import { ProductForm as ProductFormType } from '@/types/product';
import { validateProduct } from '@/utils/validateProduct';

export default function NewProductPage() {
  const router = useRouter();

  const initialValue: ProductFormType = {
    sku: '',
    sku_name: '',
    barcode: '',
    packsize: 1,

    product_type: '01',
    packing_stage: '01',

    weight: 0,
    dim_w: 0,
    dim_l: 0,
    dim_h: 0,

    color: '',
    size: '',
    brand: '',
    style_code: '',
    color_code: '',
    uom: '',

    skuid: '',
    sup_code: '',
    sup_name: '',

    temperature: '0',
    product_is: '0',
  };

  async function handleCreate(value: ProductFormType) {
    const errors = validateProduct(value);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    debugger;
    console.log(JSON.stringify(value));
    try {
      const res = await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (!res.ok || data.code !== '0') {
        alert(data.message ?? 'Create product failed');
        return;
      }

      alert('Create product success');
      router.push('/products');
    } catch {
      alert('Network error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Product
        </h1>

        <ProductForm
          mode="create"
          initialValue={initialValue}
          onSubmit={handleCreate}
          onBack={() => router.push('/products')}
        />
      </div>
    </div>
  );
}
