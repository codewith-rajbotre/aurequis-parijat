import type { AppError } from "@/lib/errors";

export const ProductStatus = {
    PUBLISHED: "published",
    HIDDEN: "hidden",
} as const;

export type ProductStatus =
    (typeof ProductStatus)[keyof typeof ProductStatus];

// Fields an admin can set; shared by create and edit.
export interface ProductForm {
    brandId: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    price: number;
    currency: string;
    stock: number;
    status: ProductStatus;
    isFeatured: boolean;
    displayOrder: number;
}

export interface Product extends ProductForm {
    id: string;
    // The owning brand, joined in when listing products.
    brand: {
        name: string;
        slug: string;
    } | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductActionResult {
    error: AppError | null;
}
