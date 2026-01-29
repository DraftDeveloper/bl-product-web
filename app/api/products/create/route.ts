import { blPost } from '@/lib/blApi';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await blPost('/Product/ProductCreate', body);
  return NextResponse.json(result);
}
