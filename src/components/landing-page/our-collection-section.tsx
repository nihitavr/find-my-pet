import Link from "next/link";
import BuyItemsCarousal from "./buy-items-carousal";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

const productInfos = [
  {
    id: "clsaik40h0000x14y9hgv3ke9",
    name: "Bone",
    image: "/shop/bone-tag-front.jpg",
    price: 999,
    discount: 20,
  },
  {
    id: "clsaiubef0001x14ys4m82lrv",
    name: "Alien Spaceship",
    image: "/shop/alien-spaceship-tag-front.jpg",
    price: 999,
    discount: 20,
  },
  {
    id: "clsaik40h0000x14y9hgv3ke9",
    name: "Cat Face",
    image: "/shop/cat-face-tag-front.jpg",
    price: 999,
    discount: 20,
  },
  {
    id: "clsaik40h0000x14y9hgv3ke9",
    name: "Paw",
    image: "/shop/paw-tag-front.jpg",
    price: 999,
    discount: 20,
  },
  {
    id: "clsaik40h0000x14y9hgv3ke9",
    name: "Shield",
    image: "/shop/shield-tag-front.jpg",
    price: 999,
    discount: 20,
  },
  {
    id: "clsaik40h0000x14y9hgv3ke9",
    name: "Bowtie",
    image: "/shop/bowtie-tag-front.jpg",
    price: 999,
    discount: 20,
  },
];
export default function OurCollectionSection() {
  return (
    <div className="justify flex flex-col items-center gap-5 p-5 md:gap-10 md:px-28 md:pb-10 md:pt-5">
      {/* Buy Now */}
      <h1 className="text-3xl font-semibold md:text-4xl">Our Collections</h1>
      <BuyItemsCarousal
        className="h-full w-full"
        imageClassName="border-[0.6px] aspect-square rounded-2xl"
        productInfos={productInfos}
      />
      <Link href={"/collections/pet-tags"}>
        <Button className="w-full text-xl font-normal">View All</Button>
      </Link>
    </div>
  );
}
