import "server-only";
import type { Product, ProductForm } from "@/lib/types/product";
import { ProductSchema } from "@/lib/validations/product";
import { type Result, toAppError } from "@/lib/errors";
import { getSupabase } from "@/lib/supabase";

// Every product row is read with its owning brand joined in.
const PRODUCT_SELECT = "*, brand:brands!inner(name, slug)";

// The `products` table uses snake_case columns; ProductSchema uses camelCase.
function toProductInput(row: Record<string, unknown>) {
    return {
        id: row.id,
        brandId: row.brand_id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        imageUrl: row.image_url,
        price: Number(row.price),
        currency: row.currency,
        stock: row.stock,
        status: row.status,
        isFeatured: row.is_featured,
        displayOrder: row.display_order,
        brand: row.brand ?? null,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function toProductRow(product: ProductForm) {
    return {
        brand_id: product.brandId,
        name: product.name,
        slug: product.slug,
        description: product.description,
        image_url: product.imageUrl,
        price: product.price,
        currency: product.currency.toUpperCase(),
        stock: product.stock,
        status: product.status,
        is_featured: product.isFeatured,
        display_order: product.displayOrder,
    };
}

function parseRows(rows: Record<string, unknown>[]) {
    return rows.flatMap((row) => {
        const parsed = ProductSchema.safeParse(toProductInput(row));

        if (!parsed.success) {
            console.error(`Skipping invalid product "${row.slug}":`, parsed.error.issues);
            return [];
        }

        return [parsed.data];
    });
}

// Pass a brand slug to list only that brand's products.
export async function fetchProducts(brandSlug?: string): Promise<Result<Product[]>> {
    try {
        let query = getSupabase().from("products").select(PRODUCT_SELECT);

        if (brandSlug) {
            query = query.eq("brand.slug", brandSlug);
        }

        const { data, error, status } = await query
            .order("display_order", { ascending: true })
            .order("name", { ascending: true });

        if (error) {
            console.error("Failed to fetch products:", error);
            return { data: null, error: toAppError(error, status, "Failed to fetch products.") };
        }

        return { data: parseRows(data ?? []), error: null };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { data: null, error: toAppError(error, undefined, "Failed to fetch products.") };
    }
}

// Postgres unique violation: a product with this slug already exists for the brand.
function duplicateSlugError(error: { code?: string }) {
    return error.code === "23505"
        ? { status: 409, message: "This brand already has a product with that slug." }
        : null;
}

export async function createProduct(product: ProductForm): Promise<Result<Product>> {
    try {
        const { data, error, status } = await getSupabase()
            .from("products")
            .insert(toProductRow(product))
            .select(PRODUCT_SELECT)
            .single();

        if (error) {
            console.error("Failed to create product:", error);
            return {
                data: null,
                error: duplicateSlugError(error) ?? toAppError(error, status, "Unable to create product."),
            };
        }

        return { data: ProductSchema.parse(toProductInput(data)), error: null };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { data: null, error: toAppError(error, undefined, "Unable to create product.") };
    }
}

export async function updateProduct(id: string, product: ProductForm): Promise<Result<Product>> {
    try {
        const { data, error, status } = await getSupabase()
            .from("products")
            .update(toProductRow(product))
            .eq("id", id)
            .select(PRODUCT_SELECT)
            .maybeSingle();

        if (error) {
            console.error("Failed to update product:", error);
            return {
                data: null,
                error: duplicateSlugError(error) ?? toAppError(error, status, "Unable to update product."),
            };
        }

        if (!data) {
            return { data: null, error: { status: 404, message: "This product no longer exists." } };
        }

        return { data: ProductSchema.parse(toProductInput(data)), error: null };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { data: null, error: toAppError(error, undefined, "Unable to update product.") };
    }
}

export async function deleteProduct(id: string): Promise<Result<null>> {
    try {
        const { error, status } = await getSupabase().from("products").delete().eq("id", id);

        if (error) {
            console.error("Failed to delete product:", error);
            return { data: null, error: toAppError(error, status, "Unable to delete product.") };
        }

        return { data: null, error: null };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { data: null, error: toAppError(error, undefined, "Unable to delete product.") };
    }
}
