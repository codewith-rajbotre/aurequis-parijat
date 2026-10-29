"use client";

import { useState } from "react";

import { deleteProductAction } from "@/actions/product-actions";
import { type AppError, toAppError } from "@/lib/errors";
import type { Product } from "@/lib/types/product";

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

interface DeleteProductDialogProps {
  // The product to delete; null keeps the dialog closed.
  product: Product | null;
  onClose: () => void;
}

export default function DeleteProductDialog({ product, onClose }: DeleteProductDialogProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  function handleOpenChange(open: boolean) {
    if (!open) {
      setError(null);
      onClose();
    }
  }

  async function handleDelete() {
    if (!product) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const result = await deleteProductAction(product.id);

      if (result.error) {
        setError(result.error);
        return;
      }

      handleOpenChange(false);
    } catch (caught) {
      setError(toAppError(caught, undefined, "Unable to delete product."));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={product !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>

          <DialogDescription className="wrap-anywhere">
            Delete &ldquo;{product?.name}&rdquo;? This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && <ApiErrorMessage error={error} />}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>

          <Button variant="destructive" disabled={deleting} onClick={handleDelete}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
