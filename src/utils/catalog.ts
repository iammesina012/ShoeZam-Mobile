import type { Product } from "@/types";

export const CATALOG_SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Name: A - Z", value: "name-ascending" },
  { label: "Name: Z - A", value: "name-descending" },
  { label: "Price: Low to High", value: "price-ascending" },
  { label: "Price: High to Low", value: "price-descending" },
];

export function getCatalogOptions(products: Product[]) {
  const brands = [...new Set(products.map((product) => product.brand))].sort();
  const colors = [
    ...new Set(
      products.flatMap((product) =>
        product.colors.map((color) => color.name),
      ),
    ),
  ].sort();
  const sizes = [
    ...new Set(products.flatMap((product) => product.sizes)),
  ].sort((first, second) => Number(first) - Number(second));

  return { brands, colors, sizes };
}

export function filterCatalogProducts(
  products: Product[],
  filters: Record<string, string[]>,
) {
  const brandFilters = filters.brands ?? [];
  const colorFilters = filters.colors ?? [];
  const sizeFilters = filters.sizes ?? [];

  return products.filter(
    (product) =>
      (brandFilters.length === 0 || brandFilters.includes(product.brand)) &&
      (colorFilters.length === 0 ||
        product.colors.some((color) => colorFilters.includes(color.name))) &&
      (sizeFilters.length === 0 ||
        product.sizes.some((size) => sizeFilters.includes(size))),
  );
}

export function sortCatalogProducts(products: Product[], sortOption: string) {
  return [...products].sort((first, second) => {
    if (sortOption === "price-ascending") return first.price - second.price;
    if (sortOption === "price-descending") return second.price - first.price;
    if (sortOption === "name-descending") {
      return second.name.localeCompare(first.name);
    }
    return first.name.localeCompare(second.name);
  });
}
