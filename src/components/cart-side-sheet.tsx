"use client";

import {
  Sheet,
  SheetClose,
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

export function CartSideSheet() {
  const { cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <ShoppingCart size={28} className="text-slate-700" />
          {cart.length > 0 && (
            <div className="absolute right-0 top-0 flex aspect-square w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-center text-xs text-white">
              <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <div className="text-start text-xl font-bold">Cart</div>
        </SheetHeader>
        <hr className="my-3" />
        <div className="flex w-full flex-col gap-5">
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
                <div className="col-span-3 flex w-full flex-col justify-center gap-1">
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-sm font-semibold">Qty:</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                      <span className="text-primary">
                        &#8377; {getDiscountedPrice(item.price, item.discount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <SheetFooter className="relative mt-8 h-[70vh] w-full">
          <SheetClose asChild>
            <Button className="absolute bottom-5 w-full" variant="default">
              Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
