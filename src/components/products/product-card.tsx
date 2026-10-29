import Link from "next/link";

import { Package, Pencil, Star, Trash2 } from "lucide-react";

import type { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/validations/product";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-brand-gold/40 hover:shadow-xl">
      <div className="relative aspect-4/3 bg-muted">
        {product.imageUrl ? (
          // Product images can come from any host, which next/image would need configured per domain.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-brand-gold/40 bg-background/80 text-brand-gold">
            {product.status}
          </Badge>

          {product.isFeatured && (
            <Badge className="bg-brand-gold text-black">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="space-y-3 p-5">
        {product.brand && (
          <Link
            href={`/brands/${product.brand.slug}`}
            className="text-xs uppercase tracking-[0.25em] text-brand-gold hover:opacity-80"
          >
            {product.brand.name}
          </Link>
        )}

        <h2 className="text-xl font-light tracking-wide wrap-break-word">{product.name}</h2>

        {product.description && (
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
        )}

        <div className="flex items-end justify-between gap-3">
          <p className="text-lg font-semibold">{formatPrice(product.price, product.currency)}</p>

          <p className={product.stock > 0 ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 border-t border-border p-4">
        <Button variant="outline" onClick={() => onEdit(product)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <Button variant="destructive" onClick={() => onDelete(product)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
