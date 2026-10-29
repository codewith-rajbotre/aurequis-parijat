"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrandAction } from "@/actions/brand-actions";
import { BrandStatus } from "@/lib/types/brand";

interface CreateBrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateBrandDialog({
  open,
  onOpenChange,
}: CreateBrandDialogProps) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    if (!name.trim()) {
      alert("Brand name is required.");
      return;
    }

    setLoading(true);

    try {
      await createBrandAction({
        name: name.trim(),
        slug: slug.trim(),
        description: description || null,
        logoUrl: null,
        bannerUrl: null,
        websiteUrl: website || null,
        country: country || null,
        foundedYear: foundedYear ? Number(foundedYear) : null,
        status: BrandStatus.PUBLISHED,
        isFeatured: false,
        displayOrder: 0,
        createdBy: null,
      });

      setName("");
      setSlug("");
      setWebsite("");
      setCountry("");
      setFoundedYear("");
      setDescription("");

      onOpenChange(false);
    } catch (error) {
      console.error(error);
      alert("Unable to create brand.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>

          <DialogDescription>
            Add a premium brand to the AUREQUIS PARIJAT collection.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Brand Name</Label>

            <Input
              id="name"
              placeholder="Rolex"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>

            <Input
              id="slug"
              placeholder="rolex"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>

              <Input
                id="website"
                placeholder="https://..."
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>

              <Input
                id="country"
                placeholder="Switzerland"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="year">Founded Year</Label>

            <Input
              id="year"
              type="number"
              placeholder="1905"
              value={foundedYear}
              onChange={(e) => setFoundedYear(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              rows={4}
              placeholder="Short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-brand-gold text-black hover:opacity-90"
          >
            {loading ? "Creating..." : "Create Brand"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
