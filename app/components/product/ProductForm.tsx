"use client";

import React from "react";
import {
  PackingStage,
  ProductForm as ProductFormType,
  ProductIs,
  ProductType,
  Temperature,
} from "@/types/product";

interface Props {
  mode: "create" | "edit";
  initialValue: ProductFormType;
  onSubmit: (value: ProductFormType) => Promise<void>;
  onBack?: () => void;
  submitting?: boolean;
}

export default function ProductForm({
  mode,
  initialValue,
  onSubmit,
  onBack,
  submitting = false,
}: Props) {
  const [form, setForm] = React.useState<ProductFormType>(initialValue);

  const input =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#f708ad]/40 focus:border-[#f708ad]";

  return (
    <div className="rounded-lg bg-white shadow border-t-4 border-[#f708ad]">
      <div className="p-6 space-y-8">
        <Section title="Basic Information">
          <Field label="SKU *">
            <input
              className={input}
              disabled={mode === "edit"}
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </Field>

          <Field label="Product Name *">
            <input
              className={input}
              value={form.sku_name}
              onChange={(e) => setForm({ ...form, sku_name: e.target.value })}
            />
          </Field>

          <Field label="Barcode *">
            <input
              className={input}
              value={form.barcode}
              onChange={(e) => setForm({ ...form, barcode: e.target.value })}
            />
          </Field>

          <Field label="Pack Size *">
            <input
              type="number"
              min={1}
              className={input}
              value={form.packsize}
              onChange={(e) =>
                setForm({ ...form, packsize: Number(e.target.value) })
              }
            />
          </Field>
        </Section>

     
        <Section title="Product Type & Packing">
          <Field label="Product Type">
            <select
              className={input}
              value={form.product_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_type: e.target.value as ProductType,
                })
              }
            >
              <option value="01">Sales Product</option>
              <option value="02">Supply Product</option>
              <option value="03">Bundle Product</option>
            </select>
          </Field>

          <Field label="Packing Stage">
            <select
              className={input}
              value={form.packing_stage}
              onChange={(e) =>
                setForm({
                  ...form,
                  packing_stage: e.target.value as PackingStage,
                })
              }
            >
              <option value="01">Product in boxes</option>
              <option value="02">With packaging unboxes</option>
              <option value="03">Without packaging unboxes</option>
            </select>
          </Field>
        </Section>


        <Section title="Dimension & Weight">
          <Field label="Weight (grams)">
            <input
              type="number"
              className={input}
              value={form.weight}
              onChange={(e) =>
                setForm({ ...form, weight: Number(e.target.value) })
              }
            />
          </Field>

          <Field label="Width (mm)">
            <input
              type="number"
              className={input}
              value={form.dim_w}
              onChange={(e) =>
                setForm({ ...form, dim_w: Number(e.target.value) })
              }
            />
          </Field>

          <Field label="Length (mm)">
            <input
              type="number"
              className={input}
              value={form.dim_l}
              onChange={(e) =>
                setForm({ ...form, dim_l: Number(e.target.value) })
              }
            />
          </Field>

          <Field label="Height (mm)">
            <input
              type="number"
              className={input}
              value={form.dim_h}
              onChange={(e) =>
                setForm({ ...form, dim_h: Number(e.target.value) })
              }
            />
          </Field>
        </Section>

        <Section title="Product Attributes">
          <Field label="Color">
            <input
              className={input}
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
          </Field>

          <Field label="Size">
            <input
              className={input}
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
            />
          </Field>

          <Field label="Brand">
            <input
              className={input}
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
          </Field>

          <Field label="Style Code">
            <input
              className={input}
              value={form.style_code}
              onChange={(e) => setForm({ ...form, style_code: e.target.value })}
            />
          </Field>

          <Field label="Color Code">
            <input
              className={input}
              value={form.color_code}
              onChange={(e) => setForm({ ...form, color_code: e.target.value })}
            />
          </Field>

          <Field label="Unit of Measure">
            <input
              className={input}
              value={form.uom}
              onChange={(e) => setForm({ ...form, uom: e.target.value })}
            />
          </Field>
        </Section>

        <Section title="Supplier">
          <Field label="SKU Ref ID">
            <input
              className={input}
              value={form.skuid}
              onChange={(e) => setForm({ ...form, skuid: e.target.value })}
            />
          </Field>

          <Field label="Supplier Code">
            <input
              className={input}
              value={form.sup_code}
              onChange={(e) => setForm({ ...form, sup_code: e.target.value })}
            />
          </Field>

          <Field label="Supplier Name">
            <input
              className={input}
              value={form.sup_name}
              onChange={(e) => setForm({ ...form, sup_name: e.target.value })}
            />
          </Field>
        </Section>

        {/* ================= Other ================= */}
        <Section title="Other Settings">
          <Field label="Temperature Control">
            <select
              className={input}
              value={form.temperature}
              onChange={(e) =>
                setForm({
                  ...form,
                  temperature: e.target.value as Temperature,
                })
              }
            >
              <option value="0">Room Temperature</option>
              <option value="1">Temperature Control</option>
            </select>
          </Field>

          <Field label="Consignment">
            <select
              className={input}
              value={form.product_is}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_is: e.target.value as ProductIs,
                })
              }
            >
              <option value="0">Outright Purchase</option>
              <option value="1">Consignment</option>
            </select>
          </Field>
        </Section>
      </div>

      <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-4 py-2
               text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={() => onSubmit(form)}
          className="rounded-md bg-[#f708ad] px-5 py-2 text-sm font-medium text-white hover:bg-[#e0069f] disabled:opacity-50"
        >
          {mode === "create" ? "Save Product" : "Update Product"}
        </button>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
