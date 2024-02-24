import Image from "next/image";
import Link from "next/link";
import { Price } from "~/components/ui/price";
import { api } from "~/lib/trpc/server";

export default async function PetTagCollections() {
  const petTagProducts = await api.product.getAllPetTags.query();

  return (
    <div className="px-3 py-4">
      <h1 className="text-xl font-semibold">Pet Tag Collections</h1>
      <div className="grid grid-cols-2 gap-3 gap-y-10 pt-4 md:grid-cols-3 lg:grid-cols-4">
        {petTagProducts.map((petTagProduct, idx) => (
          <Link
            href={`/product/${petTagProduct.id}`}
            key={idx}
            className="flex flex-col gap-2 rounded-lg  bg-white"
          >
            <div className="relative aspect-square w-full rounded-lg border">
              <Image
                fill
                src={petTagProduct.images[0]!}
                alt={petTagProduct.name}
                className="rounded-lg object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold">
                {petTagProduct.name}
              </span>
              <Price
                price={petTagProduct.price}
                discount={petTagProduct.discount}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
