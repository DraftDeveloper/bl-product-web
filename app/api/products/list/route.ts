import { NextResponse } from 'next/server';
import { blGet } from '@/lib/blApi';
import { BlProductListResponse } from '@/types/product';

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 10);

  const data = await blGet<BlProductListResponse>(
    '/Product/ProductList',
    { page, limit }
  );

  return NextResponse.json(data);
}
