"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { type Product } from "@prisma/client";
import { getDiscountedPrice } from "~/lib/utils";
import { useCart } from "~/lib/storage/cart-storage";

export function ProductShoppingButtons({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 text-2xl font-semibold text-foreground/90">
        <span className="line-through">&#8377; {product.price}</span>
        <span className="text-primary">
          &#8377; {getDiscountedPrice(product.price, product.discount)}
        </span>
      </div>
      <div>
        <div className="text-sm font-semibold">Quantity</div>
        <div className="flex w-min items-center justify-between gap-4 rounded-md border px-2 py-0.5 text-lg">
          <span
            className="w-3 cursor-pointer text-center hover:scale-125"
            onClick={() =>
              setQuantity((quantity) => (quantity - 1 > 1 ? quantity - 1 : 1))
            }
          >
            -
          </span>
          <span className="w-5 text-center">{quantity}</span>
          <span
            className="w-3 cursor-pointer text-center hover:scale-125"
            onClick={() => setQuantity((quantity) => quantity + 1)}
          >
            +
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product, quantity);
          }}
          className="md:w-80"
          variant="outline"
        >
          Add to cart
        </Button>
        <Button className="md:w-80">Buy Now</Button>
      </div>
    </div>
  );
}
