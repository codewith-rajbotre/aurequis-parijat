"use server";

import { refresh } from "next/cache";

import { createProduct, deleteProduct, updateProduct } from "@/db/supabase/products";
import type { ProductActionResult } from "@/lib/types/product";
import { ProductFormSchema } from "@/lib/validations/product";

// Creates the product when `id` is null, otherwise updates it.
export async function saveProductAction(
  id: string | null,
  input: unknown,
): Promise<ProductActionResult> {
  const validation = ProductFormSchema.safeParse(input);

  if (!validation.success) {
    return {
      error: {
        status: 400,
        message: validation.error.issues[0]?.message ?? "Please check the product details.",
      },
    };
  }

  const { error } = id
    ? await updateProduct(id, validation.data)
    : await createProduct(validation.data);

  if (!error) {
    refresh();
  }

  return { error };
}

export async function deleteProductAction(id: string): Promise<ProductActionResult> {
  const { error } = await deleteProduct(id);

  if (!error) {
    refresh();
  }

  return { error };
}
