import { z } from "zod";

import { type Product, type ProductForm, ProductStatus } from "@/lib/types/product";

export const ProductFormSchema = z.object({
    brandId: z.string().uuid("Select a brand."),

    name: z
        .string()
        .trim()
        .min(1, "Product name is required.")
        .max(150),

    slug: z
        .string()
        .trim()
        .min(1, "Slug is required.")
        .max(160)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may only use lowercase letters, numbers and hyphens."),

    description: z.string().trim().nullable(),

    imageUrl: z.string().url("Image URL must be a valid URL.").nullable(),

    price: z.number({ invalid_type_error: "Price must be a number." }).nonnegative("Price cannot be negative."),

    currency: z
        .string()
        .trim()
        .length(3, "Currency must be a 3-letter code, e.g. INR."),

    stock: z.number({ invalid_type_error: "Stock must be a number." }).int("Stock must be a whole number.").nonnegative("Stock cannot be negative."),

    status: z.enum([ProductStatus.PUBLISHED, ProductStatus.HIDDEN]),

    isFeatured: z.boolean(),

    displayOrder: z.number().int(),
}) satisfies z.ZodType<ProductForm>;

export const ProductSchema = ProductFormSchema.extend({
    id: z.string().uuid(),

    // The owning brand, joined in when listing products.
    brand: z
        .object({
            name: z.string(),
            slug: z.string(),
        })
        .nullable(),

    createdAt: z.string().optional(),

    updatedAt: z.string().optional(),
}) satisfies z.ZodType<Product>;

export function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function formatPrice(price: number, currency: string) {
    try {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }).format(price);
    } catch {
        // Unknown currency code: show the plain number.
        return `${currency} ${price}`;
    }
}
