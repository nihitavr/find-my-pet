"use client";

import { type OutputData } from "@editorjs/editorjs";
import { type Product } from "@prisma/client";
import { type JsonArray } from "@prisma/client/runtime/library";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EditorJsRender } from "~/components/editor-js-renderer";
import ProductImageCasousel from "~/components/product-images-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { getDiscountedPrice } from "~/lib/utils";

export default function ProductPage({ product }: { product: Product }) {
  const [isFixed, setIsFixed] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const leftSectionChildRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (
      !rightSectionRef.current ||
      !topSectionRef.current ||
      !leftSectionRef.current
    )
      return;

    const rightSectionBottom =
      rightSectionRef.current.getBoundingClientRect().bottom;
    const topSectionHeight = topSectionRef.current.offsetHeight;

    setWidth(leftSectionRef.current.getBoundingClientRect().width);

    // console.log(
    //   "topSectionRef: ",
    //   topSectionRef.current.getBoundingClientRect().bottom,
    // );

    if (rightSectionBottom - 40 <= topSectionHeight) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }

    if (currentScrollPos < lastScrollTop) {
      setIsScrollBottom(true);
    } else {
      setIsScrollBottom(false);
    }

    if (
      window.innerHeight -
        topSectionRef.current.getBoundingClientRect().bottom >=
      0
    ) {
      console.log(
        "bottom: ",
        window.innerHeight -
          topSectionRef.current.getBoundingClientRect().bottom,
      );

      setIsScrollBottom(true);
    }

    console.log("currentScrollPos: ", currentScrollPos);
    console.log("lastScrollTop: ", lastScrollTop);

    setLastScrollTop(currentScrollPos);
  };

  const accordianDefaultValues = (product?.details as JsonArray)?.map(
    (_, idx) => `item-${idx}`,
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex flex-col gap-2 overflow-y-auto p-3 pt-0 md:px-6 md:py-10">
      {/* Top Section */}
      <div
        ref={topSectionRef}
        className="flex grid-cols-12 flex-col gap-2 md:grid md:gap-5"
      >
        {/* Left Section */}
        {/* Product Images */}
        <div ref={leftSectionRef} className={`col-span-5 h-full w-full`}>
          <div
            ref={leftSectionChildRef}
            className={`${isFixed ? "fixed left-6" : ""} h-full w-full`}
            style={{
              width: isFixed ? width : "100%",
              top: isScrollBottom ? "5rem" : "auto",
            }}
          >
            <ProductImageCasousel
              images={product.images}
              className="col-span-5 aspect-[6/5] w-full"
              imageClassName="rounded-none border-none"
            />
          </div>
        </div>

        {/* Right Section */}
        {/* Product Info */}
        <div
          ref={rightSectionRef}
          className="col-span-7 flex flex-col gap-3 px-1"
        >
          <div className="flex flex-col gap-2  overflow-y-auto pt-0">
            <h1 className="text-xl font-semibold">{product?.name}</h1>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
          </div>

          {/* <div className="flex flex-col gap-2">
          <Button className="md:w-52" variant="outline">
            Add to cart
          </Button>
          <Button className="md:w-52">Buy Now</Button>
        </div> */}

          <div className="flex items-center gap-2 text-xl font-semibold text-foreground/90">
            <span className="line-through">&#8377; {product.price}</span>
            <span className="text-primary">
              &#8377; {getDiscountedPrice(product.price, product.discount)}
            </span>
          </div>
          <div>
            <div className="text-xs">
              This will open a{" "}
              <span className="font-semibold">Google Form</span> for checkout.*
            </div>
            <a href={"https://forms.gle/uQedFpbeEBM2m4NEA"} target="_blank">
              <Button className="w-full">
                Buy Now <ArrowUpRight />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <hr className="mt-5" />

      {(product?.details as JsonArray)?.length > 0 && (
        <Accordion
          defaultValue={accordianDefaultValues}
          type="multiple"
          className="flex flex-col"
        >
          {(product?.details as JsonArray).map((detail, idx) => {
            return (
              <AccordionItem value={`item-${idx}`} key={idx}>
                <AccordionTrigger>
                  <div className="text-2xl font-semibold md:text-3xl">
                    {(detail as any)?.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <EditorJsRender data={(detail as any)?.data as OutputData} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </main>
  );
}
