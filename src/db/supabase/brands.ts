import "server-only";
import {
    type Brand,
    BrandSchema,
    type CreateBrand,
} from "@/lib/validations/brand";
import { type Result, toAppError } from "@/lib/errors";
import type { BrandDetails } from "@/lib/types/brand";
import { getSupabase } from "@/lib/supabase";

// The `brands` table uses snake_case columns; BrandSchema uses camelCase.
function toBrandInput(row: Record<string, unknown>) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        logoUrl: row.logo_url,
        bannerUrl: row.banner_url,
        websiteUrl: row.website_url,
        country: row.country,
        foundedYear: row.founded_year,
        status: row.status,
        isFeatured: row.is_featured,
        displayOrder: row.display_order,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export async function fetchAllBrands(): Promise<Result<Brand[]>> {
    try {
        const { data, error, status } = await getSupabase()
            .from("brands")
            .select("*")
            .order("display_order", {
                ascending: true,
            })
            .order("name", {
                ascending: true,
            });

        if (error) {
            console.error("Failed to fetch brands:", error);
            return { data: null, error: toAppError(error, status, "Failed to fetch brands.") };
        }

        const brands = (data ?? []).flatMap((row) => {
            const parsed = BrandSchema.safeParse(toBrandInput(row));

            if (!parsed.success) {
                console.error(`Skipping invalid brand "${row.slug}":`, parsed.error.issues);
                return [];
            }

            return [parsed.data];
        });

        return { data: brands, error: null };
    } catch (error) {
        console.error("Failed to fetch brands:", error);
        return { data: null, error: toAppError(error, undefined, "Failed to fetch brands.") };
    }
}

// `data: null` with no error means the brand does not exist.
export async function fetchBrandBySlug(
    slug: string,
): Promise<Result<BrandDetails | null>> {
    try {
        const { data, error, status } = await getSupabase()
            .from("brands")
            .select(
                `
      *,
      brand_themes(*),
      brand_content(*),
      brand_statistics(*),
      brand_heritage(*),
      brand_collections(*),
      brand_features(*),
      brand_gallery(*),
      brand_sections(*)
    `,
            )
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            console.error("Failed to fetch brand:", error);
            return { data: null, error: toAppError(error, status, "Failed to fetch brand details.") };
        }

        return { data, error: null };
    } catch (error) {
        console.error("Failed to fetch brand:", error);
        return { data: null, error: toAppError(error, undefined, "Failed to fetch brand details.") };
    }
}

export async function createBrand(
  brand: CreateBrand
) {
  try {
    const { data, error } = await getSupabase()
      .from("brands")
      .insert({
        name: brand.name,
        slug: brand.slug,
        description: brand.description,

        logo_url: brand.logoUrl,
        banner_url: brand.bannerUrl,
        website_url: brand.websiteUrl,

        country: brand.country,
        founded_year: brand.foundedYear,

        status: brand.status,

        is_featured: brand.isFeatured,
        display_order: brand.displayOrder,

        created_by: brand.createdBy,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }
    return BrandSchema.parse(toBrandInput(data));
  } catch (error) {
    console.error("Failed to create brand:", error);
    throw new Error("Unable to create brand.");
  }
}
