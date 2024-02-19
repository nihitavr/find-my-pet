import { type OutputData } from "@editorjs/editorjs";
import { type JsonArray } from "@prisma/client/runtime/library";
import { EditorJsRender } from "~/components/editor-js-renderer";
import ProductImageCasousel from "~/components/product-images-carousel";
import { ProductShoppingButtons } from "~/components/product-shopping-buttons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import NotFound from "~/components/ui/errors/not-found";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/trpc/server";

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await api.product.getProductById.query({
    id,
  });

  if (!product) {
    return <NotFound />;
  }

  const accordianDefaultValues = (product?.details as JsonArray)?.map(
    (_, idx) => `item-${idx}`,
  );

  return (
    <main className="flex flex-col gap-2 p-3 pt-0 md:px-6 md:py-10">
      <div className="flex grid-cols-12 flex-col gap-2 md:grid md:gap-5">
        {/* Product Images */}
        <div className="col-span-5 w-full">
          <ProductImageCasousel
            images={product.images}
            className="col-span-5 aspect-[6/5] w-full"
            imageClassName="rounded-none border-none"
          />
        </div>

        {/* Product Info */}
        <div className="col-span-7 flex flex-col gap-3 px-1">
          <div className="flex flex-col gap-2  overflow-y-auto pt-0">
            <h1 className="text-xl font-semibold">{product?.name}</h1>
            <div>
              <Label>Description</Label>
              <p>{product?.description}</p>
            </div>
          </div>

          <ProductShoppingButtons product={product} />
          {/* <div>
            <div className="text-xs">
              This will open a{" "}
              <span className="font-semibold">Google Form</span> for checkout.*
            </div>
            <a href={"https://forms.gle/uQedFpbeEBM2m4NEA"} target="_blank">
              <Button className="w-full">
                Buy Now <ArrowUpRight />
              </Button>
            </a>
          </div> */}
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
