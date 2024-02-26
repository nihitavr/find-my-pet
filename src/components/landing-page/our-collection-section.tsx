import BuyItemsCarousal from "./buy-items-carousal";
import { Button } from "../ui/button";
import { api } from "~/lib/trpc/server";
import { ArrowUpRight } from "lucide-react";

export default async function OurCollectionSection() {
  const petTagProducts = await api.product.getAllPetTags.query();

  return (
    <div className="justify flex flex-col items-center gap-5 bg-slate-50 p-5 py-8 md:gap-10 md:px-28 md:py-10">
      {/* Buy Now */}
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:text-5xl ">
        {/* <h1 className="text-center text-3xl font-semibold md:text-5xl"> */}
        Our Collections
      </h1>
      <BuyItemsCarousal
        className="h-full w-full"
        // imageClassName="shadow aspect-square rounded-2xl"
        imageClassName="border-[0.6px] aspect-square rounded-2xl"
        productInfos={petTagProducts}
      />
      {/* <Link href={"/collections/pet-tags"}>
        <Button className="w-full text-xl font-normal">View All</Button>
      </Link> */}
      <div className="w-full flex-col items-center justify-center md:flex">
        <div className="pb-1 text-xs">
          This will open a <span className="font-semibold">Google Form</span>{" "}
          for checkout.*
        </div>
        <a href={"https://forms.gle/uQedFpbeEBM2m4NEA"} target="_blank">
          <Button className="w-full">
            Buy Now <ArrowUpRight />
          </Button>
        </a>
      </div>{" "}
    </div>
  );
}
