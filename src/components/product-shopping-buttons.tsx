"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { type Product } from "@prisma/client";
import { useCart } from "~/lib/storage/cart-storage";
import Price from "./ui/price";
import { cn } from "~/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import PetTagCustomizer from "./product-tag-customizer";

export default function ProductShoppingButtons({
  product,
}: {
  product: Product;
}) {
  const addToCartRef = useRef<HTMLButtonElement>(null);
  const [fixedATC, setFixedATC] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const atcTop = addToCartRef?.current?.getBoundingClientRect()?.top;
      if (!atcTop) {
        return;
      }

      if (atcTop < -50) {
        setFixedATC(true);
      } else {
        setFixedATC(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div>
        {/* Quantity */}
        <span className="text-sm font-semibold">Quantity</span>
        <div className="flex items-center gap-5">
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

          {/* Price */}
          <Price
            className="text-2xl"
            price={product.price}
            discount={product.discount}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row ">
        <Button
          ref={addToCartRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDialogOpen(true);
          }}
          className={cn("rounded-lg py-6 text-lg font-normal md:w-full")}
          variant="secondary"
        >
          Add to cart
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDialogOpen(true);
          }}
          className="rounded-lg py-6 text-lg font-normal md:w-full"
        >
          Buy Now
        </Button>
      </div>

      <div
        className={`fixed bottom-5 left-0 z-50 w-full px-3 transition-opacity duration-500 ${
          fixedATC ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDialogOpen(true);
            addItem(product, quantity);
          }}
          className={cn(
            "!mr-3 w-full rounded-lg px-3 py-6 text-lg font-normal md:float-right md:w-44",
          )}
          variant="secondary"
        >
          Add to cart
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customisation (Pet Tag)</DialogTitle>
            <DialogDescription>
              <PetTagCustomizer
                product={product}
                quantity={quantity}
                imageSrc={"/bone-tag-front-skeleton.jpg"}
                setDialogOpen={setDialogOpen}
                startXRatio={0.2885} // Adjust these values based on your image
                startYRatio={0.635}
                stopXRatio={0.748} // Adjust these values based on your image
                stopYRatio={0.8}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
