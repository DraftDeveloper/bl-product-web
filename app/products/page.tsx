"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlProductItem, BlProductListResponse } from "@/types/product";

export default function ProductListPage() {
  const [items, setItems] = useState<BlProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function encodeProduct(p: unknown) {
    return encodeURIComponent(JSON.stringify(p));
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/products/list?page=1&limit=100000");
        const data = (await res.json()) as BlProductListResponse;
        console.log(data);
        if (cancelled) return;

        if (data.code === "0" && Array.isArray(data.productitems)) {
          setItems(data.productitems);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load product list");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading products…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>

        <Link
          href="/products/new"
          className="
            inline-flex items-center justify-center h-[37px] px-[25px]
            bg-[#f708ad] text-white
            font-['Prompt'] text-[14px] font-medium
            rounded-lg
            hover:bg-[#e0069f]
            focus:outline-none focus:ring-2 focus:ring-[#f708ad]/40
            transition
          "
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow border border-[#f708ad]">
        <table className="min-w-[1900px] border-collapse text-xs">
          <thead className="bg-[#f708ad]">
            <tr>
              <Th>SKU</Th>
              <Th>Name</Th>
              <Th>Barcode</Th>
              <Th>Pack</Th>
              <Th>Type</Th>
              <Th>Packing</Th>
              <Th>Weight</Th>
              <Th>W</Th>
              <Th>L</Th>
              <Th>H</Th>
              <Th>Color</Th>
              <Th>Size</Th>
              <Th>Brand</Th>
              <Th>Style</Th>
              <Th>Color Code</Th>
              <Th>UOM</Th>
              <Th>SKU ID</Th>
              <Th>Shop</Th>
              <Th>Supplier</Th>
              <Th>Temp</Th>
              <Th>Consign</Th>
              <Th sticky align="right">
                Action
              </Th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={22}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No product data
                </td>
              </tr>
            )}

            {items.map((p) => (
              <tr key={p.sku} className="hover:bg-gray-50">
                <Td mono>{p.sku}</Td>
                <Td>{p.sku_name}</Td>
                <Td>{p.barcode}</Td>
                <Td right>{p.packsize}</Td>
                <Td>{p.product_type}</Td>
                <Td>{p.packing_stage}</Td>
                <Td right>{p.weight}</Td>
                <Td right>{p.dim_w}</Td>
                <Td right>{p.dim_l}</Td>
                <Td right>{p.dim_h}</Td>
                <Td>{p.color}</Td>
                <Td>{p.size}</Td>
                <Td>{p.brand}</Td>
                <Td>{p.style_code}</Td>
                <Td>{p.color_code}</Td>
                <Td>{p.uom}</Td>
                <Td mono>{p.skuid}</Td>
                <Td mono>{p.shopid}</Td>
                <Td>{p.sup_name}</Td>
                <Td>{p.temperature}</Td>
                <Td>{p.product_is}</Td>
                <Td sticky right>
                  <Link
                    href={`/products/${p.sku}?data=${encodeProduct(p)}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
  sticky,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  sticky?: boolean;
}) {
  return (
    <th
      className={`
        px-3 py-3 font-semibold text-white whitespace-nowrap
        ${align === "right" ? "text-right" : "text-left"}
        ${sticky ? "sticky right-0 bg-[#f708ad] z-20" : ""}
      `}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  mono,
  right,
  sticky,
}: {
  children: React.ReactNode;
  mono?: boolean;
  right?: boolean;
  sticky?: boolean;
}) {
  return (
    <td
      className={`
        px-3 py-2 whitespace-nowrap
        ${mono ? "font-mono text-gray-700" : "text-gray-800"}
        ${right ? "text-right" : "text-left"}
        ${
          sticky
            ? "sticky right-0 bg-white z-10 shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.15)]"
            : ""
        }
      `}
    >
      {children ?? "-"}
    </td>
  );
}
