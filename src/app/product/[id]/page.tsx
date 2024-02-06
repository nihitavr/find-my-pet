import PhotoCasousel from "~/components/product-images-carousel";
import { Button } from "~/components/ui/button";
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

  console.log("product.varients", product.variants);

  return (
    <main className="flex flex-col gap-2 p-3 md:flex-row md:py-10">
      <div className="w-">
        <PhotoCasousel
          images={product.images}
          className="aspect-[6/5] w-full"
          imageClassName="rounded-none border-none"
        />
      </div>

      {/* Varients */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 px-1 pb-3 pt-0">
          <h1 className="text-xl font-semibold">{product?.name}</h1>
          <div>
            <Label>Description</Label>
            <p>{product?.description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="md:w-52" variant="outline">
            Add to cart
          </Button>
          <Button className="md:w-52">Buy Now</Button>
        </div>
      </div>
    </main>
  );
}
