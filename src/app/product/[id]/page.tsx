import { ArrowUpRight } from "lucide-react";
import ProductImageCasousel from "~/components/product-images-carousel";
import { Button } from "~/components/ui/button";
import NotFound from "~/components/ui/errors/not-found";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/trpc/server";
import { getDiscountedPrice } from "~/lib/utils";

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

  return (
    <main className="flex flex-col gap-2 p-3 pt-0 md:flex-row md:py-10">
      <div className="w-full">
        <ProductImageCasousel
          images={product.images}
          className="aspect-[6/5] w-full"
          imageClassName="rounded-none border-none"
        />
      </div>

      {/* Varients */}
      <div className="flex flex-col gap-3 px-1">
        <div className="flex flex-col gap-2  pt-0">
          <h1 className="text-xl font-semibold">{product?.name}</h1>
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
            This will open a <span className="font-semibold">Google Form</span>{" "}
            for checkout.*
          </div>
          <a href={"https://forms.gle/uQedFpbeEBM2m4NEA"} target="_blank">
            <Button className="w-full">
              Buy Now <ArrowUpRight />
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}
