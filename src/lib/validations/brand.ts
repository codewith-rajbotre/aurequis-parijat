import { z } from "zod";

import { BrandStatus } from "@/lib/types/brand";

export const BrandSchema = z.object({
    id: z.string().uuid(),

    name: z
        .string()
        .trim()
        .min(1, "Brand name is required.")
        .max(120),

    slug: z
        .string()
        .trim()
        .min(1, "Slug is required.")
        .max(150),

    description: z
        .string()
        .nullable()
        .optional(),

    logoUrl: z
        .string()
        .url()
        .nullable()
        .optional(),

    bannerUrl: z
        .string()
        .url()
        .nullable()
        .optional(),

    websiteUrl: z
        .string()
        .url()
        .nullable()
        .optional(),

    country: z
        .string()
        .max(100)
        .nullable()
        .optional(),

    foundedYear: z
        .number()
        .int()
        .nullable()
        .optional(),

    status: z
        .enum([
            BrandStatus.PUBLISHED,
            BrandStatus.HIDDEN,
        ])
        .default(BrandStatus.PUBLISHED),

    isFeatured: z
        .boolean()
        .default(false),

    displayOrder: z
        .number()
        .int()
        .default(0),

    createdBy: z
        .string()
        .uuid()
        .nullable()
        .optional(),

    createdAt: z.string().optional(),

    updatedAt: z.string().optional(),
});

export type Brand = z.infer<typeof BrandSchema>;

export const CreateBrandSchema = BrandSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type CreateBrand = z.infer<typeof CreateBrandSchema>;