import Link from "next/link";
import BuyItemsCarousal from "./buy-items-carousal";
import { Button } from "../ui/button";
import { api } from "~/lib/trpc/server";

export default async function OurCollectionSection() {
  const petTagProducts = await api.product.getAllPetTags.query();

  return (
    <div className="justify flex flex-col items-center gap-5 bg-slate-50 p-5 py-10 md:gap-10 md:px-28">
      {/* Buy Now */}
      <h1 className="text-center text-3xl font-semibold md:text-4xl">
        Our Pet Tag Collections
      </h1>
      <BuyItemsCarousal
        className="h-full w-full"
        // imageClassName="shadow aspect-square rounded-2xl"
        imageClassName="border-[0.6px] aspect-square rounded-2xl"
        productInfos={petTagProducts}
      />
      <Link href={"/collections/pet-tags"}>
        <Button className="w-full text-xl font-normal">View All</Button>
      </Link>
    </div>
  );
}
