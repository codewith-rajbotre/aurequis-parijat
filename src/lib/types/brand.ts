export const BrandStatus = {
    PUBLISHED: "published",
    HIDDEN: "hidden",
} as const;

export type BrandStatus =
    (typeof BrandStatus)[keyof typeof BrandStatus];
export interface BrandTheme {
    id: string;
    brand_id: string;
    theme_name: "light" | "dark";
    primary_color: string;
    primary_hover: string | null;
    primary_active: string | null;
    secondary_color: string | null;
    secondary_hover: string | null;
    accent_color: string | null;
    background_color: string | null;
    surface_color: string | null;
    card_color: string | null;
    navbar_color: string | null;
    sidebar_color: string | null;
    footer_color: string | null;
    text_primary: string | null;
    text_secondary: string | null;
    text_muted: string | null;
    text_inverse: string | null;
    border_color: string | null;
    divider_color: string | null;
    input_background: string | null;
    input_border: string | null;
    input_text: string | null;
    button_text: string | null;
    success_color: string | null;
    warning_color: string | null;
    error_color: string | null;
    info_color: string | null;
    shadow_color: string | null;
    created_at: string;
}

export interface BrandContent {
    id: string;
    brand_id: string;

    hero_eyebrow: string | null;
    hero_title: string | null;
    hero_description: string | null;

    story_eyebrow: string | null;
    story_title: string | null;
    story_description: string | null;

    craftsmanship_eyebrow: string | null;
    craftsmanship_title: string | null;
    craftsmanship_description: string | null;

    heritage_eyebrow: string | null;
    heritage_title: string | null;
    heritage_description: string | null;

    contact_eyebrow: string | null;
    contact_title: string | null;
    contact_description: string | null;

    created_at: string;
    updated_at: string;
}

export interface BrandStatistic {
    id: string;
    brand_id: string;

    label: string;
    value: string;
    description: string | null;

    display_order: number;

    created_at: string;
}

export interface BrandHeritage {
    id: string;
    brand_id: string;

    year: string;
    title: string;
    description: string | null;

    display_order: number;

    created_at: string;
}

export interface BrandCollection {
    id: string;
    brand_id: string;

    name: string;
    slug: string;

    description: string | null;
    image_url: string | null;

    display_order: number;
    is_featured: boolean;

    created_at: string;
    updated_at: string;
}

export interface BrandFeature {
    id: string;
    brand_id: string;

    title: string;
    description: string | null;
    icon: string | null;

    display_order: number;

    created_at: string;
}

export interface BrandGallery {
    id: string;
    brand_id: string;

    image_url: string;
    title: string | null;
    description: string | null;

    display_order: number;

    created_at: string;
}

export interface BrandSection {
    id: string;
    brand_id: string;

    section_type: string;

    eyebrow: string | null;
    title: string | null;
    subtitle: string | null;
    description: string | null;

    image_url: string | null;

    display_order: number;
    is_visible: boolean;

    created_at: string;
    updated_at: string;
}

export interface BrandDetails {
    id: string;

    name: string;
    slug: string;

    description: string | null;

    logo_url: string | null;
    banner_url: string | null;
    website_url: string | null;

    country: string | null;
    founded_year: number | null;

    status: "draft" | "published" | "archived" | string;

    is_featured: boolean;
    display_order: number;

    created_by: string | null;

    created_at: string;
    updated_at: string;

    brand_themes: BrandTheme[];
    brand_content: BrandContent[];
    brand_sections: BrandSection[];
    brand_statistics: BrandStatistic[];
    brand_heritage: BrandHeritage[];
    brand_collections: BrandCollection[];
    brand_features: BrandFeature[];
    brand_gallery: BrandGallery[];
}