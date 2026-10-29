"use client";

import { useState } from "react";

import { saveProductAction } from "@/actions/product-actions";
import { type AppError, toAppError } from "@/lib/errors";
import type { Brand } from "@/lib/validations/brand";
import { type Product, ProductStatus } from "@/lib/types/product";
import { slugify } from "@/lib/validations/product";

import { ApiErrorMessage } from "@/components/errors";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brands: Brand[];
  // The product to edit; null creates a new one.
  product: Product | null;
  // Brand preselected for a new product, e.g. when viewing one brand's products.
  defaultBrandId?: string;
}

export default function ProductFormDialog({ open, onOpenChange, ...formProps }: ProductFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {/* The dialog unmounts its content when closed, so each open starts with fresh form state. */}
        <ProductForm {...formProps} onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

const statusItems = [
  { value: ProductStatus.PUBLISHED, label: "Published" },
  { value: ProductStatus.HIDDEN, label: "Hidden" },
];

function ProductForm({
  brands,
  product,
  defaultBrandId,
  onDone,
}: Omit<ProductFormDialogProps, "open" | "onOpenChange"> & { onDone: () => void }) {
  const [brandId, setBrandId] = useState(product?.brandId ?? defaultBrandId ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  // A new product's slug follows its name until the slug is edited by hand.
  const [slugEdited, setSlugEdited] = useState(Boolean(product));
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [currency, setCurrency] = useState(product?.currency ?? "INR");
  const [stock, setStock] = useState(product ? String(product.stock) : "0");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? ProductStatus.PUBLISHED);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const brandItems = brands.map((brand) => ({ value: brand.id, label: brand.name }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const result = await saveProductAction(product?.id ?? null, {
        brandId,
        name,
        slug,
        description: description.trim() || null,
        imageUrl: imageUrl.trim() || null,
        // Empty inputs become NaN so validation reports them instead of saving 0.
        price: price.trim() ? Number(price) : Number.NaN,
        currency: currency.toUpperCase(),
        stock: stock.trim() ? Number(stock) : Number.NaN,
        status,
        isFeatured,
        displayOrder: product?.displayOrder ?? 0,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      onDone();
    } catch (caught) {
      setError(toAppError(caught, undefined, "Unable to save product."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>

        <DialogDescription>Every product belongs to one brand.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-5 py-2">
        <div className="grid gap-2">
          <Label htmlFor="product-brand">Brand</Label>

          <Select items={brandItems} value={brandId || null} onValueChange={(value) => setBrandId(value ?? "")}>
            <SelectTrigger id="product-brand" className="h-9 w-full">
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>

            <SelectContent>
              {brandItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="product-name">Product Name</Label>

            <Input
              id="product-name"
              placeholder="Submariner Date"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slugEdited) {
                  setSlug(slugify(e.target.value));
                }
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-slug">Slug</Label>

            <Input
              id="product-slug"
              placeholder="submariner-date"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugEdited(true);
              }}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="product-price">Price</Label>

            <Input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-currency">Currency</Label>

            <Input
              id="product-currency"
              maxLength={3}
              placeholder="INR"
              value={currency}
              onChange={(e) => setCurrency(e.target.value.toUpperCase())}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-stock">Stock</Label>

            <Input
              id="product-stock"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="product-image">Image URL</Label>

          <Input
            id="product-image"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="product-description">Description</Label>

          <Textarea
            id="product-description"
            rows={3}
            placeholder="Short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="product-status">Status</Label>

            <Select
              items={statusItems}
              value={status}
              onValueChange={(value) => value && setStatus(value)}
            >
              <SelectTrigger id="product-status" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {statusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Label htmlFor="product-featured" className="flex h-9 items-center gap-3">
            <input
              id="product-featured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 accent-brand-gold"
            />
            Featured product
          </Label>
        </div>

        {error && <ApiErrorMessage error={error} />}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>

        <Button type="submit" disabled={saving} className="bg-brand-gold text-black hover:opacity-90">
          {saving ? "Saving..." : product ? "Save Changes" : "Add Product"}
        </Button>
      </DialogFooter>
    </form>
  );
}
