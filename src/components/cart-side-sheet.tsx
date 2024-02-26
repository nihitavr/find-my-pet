"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { type CartItem, useCart } from "~/lib/storage/cart-storage";
import { getDiscountedPrice } from "~/lib/utils";
import { Button } from "./ui/button";
import Price from "./ui/price";

export function CartSideSheet() {
  const { cart, addItem, removeItem } = useCart();

  const cartSize = cart.reduce((size, item) => size + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) =>
      total + getDiscountedPrice(item.price, item.discount) * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger
        onClick={(e) => {
          if (cartSize == 0) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        asChild
      >
        <div className="relative cursor-pointer hover:scale-105">
          <ShoppingCart size={28} className="text-slate-700" />
          {cart.length > 0 && (
            <div className="absolute right-0 top-0 flex aspect-square w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-center text-xs text-white">
              <span>{cartSize}</span>
            </div>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="h-[100vh] w-[90%]">
        <SheetHeader>
          <div className="text-start text-xl font-bold">Cart</div>
        </SheetHeader>
        <hr className="my-3" />
        <div className="relative flex h-full w-full flex-col gap-5 overflow-y-auto pb-32">
          {cart.length > 0 &&
            cart.map((item: CartItem, index) => (
              <div key={index} className="grid grid-cols-5 gap-4">
                <div className="relative col-span-2 aspect-square">
                  <Image
                    src={item.images[0]!}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="col-span-3 flex w-full flex-col justify-center gap-2">
                  <div className="text-sm font-semibold">{item.name}</div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="flex w-min items-center justify-between gap-4 rounded-md border px-2 text-lg">
                      <span
                        className="w-2 cursor-pointer text-center hover:scale-125"
                        onClick={() => removeItem(item.id, 1)}
                      >
                        -
                      </span>
                      <span className="w-3 text-center">{item.quantity}</span>
                      <span
                        className="w-2 cursor-pointer text-center hover:scale-125"
                        onClick={() => addItem(item, 1)}
                      >
                        +
                      </span>
                    </div>

                    {/* Price */}
                    <Price price={item.price} discount={item.discount} />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <SheetFooter className="absolute bottom-0 left-0 w-full gap-3 bg-white px-5 pb-5 pt-2">
          <div>
            <Button
              className="w-full py-6 text-lg font-normal"
              variant="default"
            >
              Checkout
            </Button>
          </div>
          <span className="font-semi-bold text-xl">Subtotal: {cartTotal}</span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
