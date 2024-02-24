import { type Product } from "@prisma/client";

export function getProductRelativeUrl(product: Product): string {
  const nameParam = product.name
    ?.toLowerCase()
    .replace("-", " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .join("-");

  return `/product/${nameParam}/${product.id}`;
}
