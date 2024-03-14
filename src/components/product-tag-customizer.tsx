import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "~/lib/utils";
import { useCart } from "~/lib/storage/cart-storage";
import { type Product } from "@prisma/client";
import { JsonArray } from "@prisma/client/runtime/library";

const PetTagCustomizer = ({
  product,
  quantity,
  setDialogOpen,
}: {
  product: Product;
  quantity: number;
  setDialogOpen: (open: boolean) => void;
}) => {
  const productCustomization = (product?.customisations as JsonArray as any)[0];
  const attributeName = productCustomization.attributes[0].name;
  const startXRatio: number = productCustomization.attributes[0].startXRatio;
  const startYRatio: number = productCustomization.attributes[0].startYRatio;
  const endXRatio: number = productCustomization.attributes[0].endXRatio;
  const endYRatio: number = productCustomization.attributes[0].endYRatio;

  const [name, setName] = useState("");

  const nameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { addItem } = useCart();

  const imageUrl = productCustomization.imageUrl;

  useEffect(() => {
    adjustFontSize();
  }, [name, nameRef?.current?.offsetWidth]);

  const adjustFontSize = () => {
    if (!imageRef.current || !nameRef.current) return;

    const nameWidth = nameRef.current.offsetWidth;
    const nameHeight = nameRef.current.offsetHeight;
    const maxBoxWidth =
      (endXRatio - startXRatio) * imageRef.current.offsetWidth;
    const maxBoxHeight =
      (endYRatio - startYRatio) * imageRef.current.offsetHeight;

    if (nameHeight && maxBoxHeight && nameHeight != maxBoxHeight) {
      const scaleFactor = maxBoxHeight / nameHeight;
      if (scaleFactor * nameWidth < maxBoxWidth) {
        nameRef.current.style.transform = `scale(${scaleFactor})`;
      }
    }

    if (nameWidth && maxBoxWidth && nameWidth != maxBoxWidth) {
      const scaleFactor = maxBoxWidth / nameWidth;

      if (scaleFactor * nameHeight < maxBoxHeight) {
        nameRef.current.style.transform = `scale(${scaleFactor})`;
      }
    }
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="h-72 w-full md:h-96">
        <div className="relative m-auto aspect-square h-full">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={imageUrl}
            alt="Pet Tag"
            ref={imageRef}
          />
          <div
            className="absolute z-50 flex flex-row items-center justify-center text-foreground/90"
            style={{
              left: `${startXRatio * 100}%`,
              top: `${startYRatio * 100}%`,
              width: `${(endXRatio - startXRatio) * 100}%`,
              height: `${(endYRatio - startYRatio) * 100}%`,
            }}
          >
            <span
              className="font-next-bro p-0 text-center text-3xl tracking-wider"
              ref={nameRef}
            >
              {name}
            </span>
          </div>
        </div>
      </div>

      <Label className="float-left">{attributeName}</Label>
      <Input
        type="text"
        value={name}
        onChange={handleChange}
        className="!z-50 mt-5 rounded border p-2"
        placeholder="Enter pet's name"
      />

      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addItem(product, quantity);
          setDialogOpen(false);
        }}
        className={cn("mt-5 rounded-lg py-6 text-lg font-normal md:w-full")}
        variant="secondary"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default PetTagCustomizer;
