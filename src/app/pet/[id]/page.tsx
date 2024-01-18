import { Instagram } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import { Share } from "~/components/ui/icons";
import NotFound from "~/components/ui/not-found";
import { api } from "~/lib/trpc/server";
import { getTimePassed, titleCase } from "~/lib/utils";

// export const metadata = {
//   title: "Find My Pet - Pet Profile",
// };

const Tags: any = {
  Neat: "bg-green-100 text-green-800",
  Friendly: "bg-blue-100 text-blue-800",
  Cute: "bg-yellow-100 text-yellow-800",
  Calm: "bg-purple-100 text-purple-800",
  Playful: "bg-pink-100 text-pink-800",
  Active: "bg-red-100 text-red-800",
  Loyal: "bg-gray-100 text-gray-800",
  Protective: "bg-black text-white",
  Smart: "bg-blue-100 text-blue-800",
  Independent: "bg-green-100 text-green-800",
  Quiet: "bg-gray-100 text-gray-800",
  Loud: "bg-yellow-100 text-yellow-800",
  Lazy: "bg-purple-100 text-purple-800",
  Energetic: "bg-red-100 text-red-800",
  Shy: "bg-blue-100 text-blue-800",
  Affectionate: "bg-pink-100 text-pink-800",
  Cuddly: "bg-yellow-100 text-yellow-800",
  Adventurous: "bg-green-100 text-green-800",
  Clever: "bg-purple-100 text-purple-800",
  Brave: "bg-red-100 text-red-800",
  "Good with kids": "bg-blue-100 text-blue-800",
  "Bad with other pets": "bg-red-100 text-red-800",
  "Bad with kids": "bg-red-100 text-red-800",
  "Good with other pets": "bg-blue-100 text-blue-800",
  "Good with other dogs": "bg-blue-100 text-blue-800",
  "Bad with other dogs": "bg-red-100 text-red-800",
};

export default async function PetProfileForm({
  params,
}: {
  params: { id: string };
}) {
  const pet = await api.pet.getPet.query({ id: params.id });

  if (!pet) return <NotFound />;

  // Pick random five elements from the Tags object
  const tags = Object.keys(Tags)
    .sort(() => Math.random() - Math.random())
    .slice(0, 7);

  return (
    <>
      <Head>
        <title>Page Title Fuck</title>
      </Head>
      <div className="flex flex-col items-center">
        {/* Image Section */}
        <div className="relative aspect-square w-full md:w-2/5">
          <Image
            src={
              pet.profileImages[0]
                ? pet.profileImages[0]
                : pet.type === "dog"
                  ? "/dog-avatar.jpeg"
                  : "/cat-avatar.jpeg"
            }
            alt="Profile Image"
            fill
            style={{ objectFit: "cover" }}
            className="md:rounded-t-3xl"
            loading="lazy"
          />
        </div>

        {/* Details Section */}
        <div className="-mt-5 flex w-full -translate-y-0 flex-col gap-4 rounded-t-3xl bg-white p-6 md:w-2/5">
          {/* Breed, Type, Name, Gender, Birthdate */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm  text-primary/80">
                {pet?.breed} ({titleCase(pet?.type)})
              </span>
              <span className="text-2xl font-semibold text-primary">
                {pet?.name}
              </span>
              <div className="flex items-center gap-2 text-sm text-primary/80">
                <span>{titleCase(pet?.gender)}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-[#999999]"></div>
                <span>{getTimePassed(pet?.birthdate)}</span>
              </div>
            </div>

            {/* Insta and Share button */}
            <div className="flex items-center gap-2">
              <a href={(pet.socialMediaLinks as any).instagram} target="_blank">
                <Instagram className="cursor-pointer text-primary/50 hover:text-primary" />
              </a>
              <Share
                className="cursor-pointer text-primary/50 hover:text-primary"
                shareInfo={{
                  title: `${pet.name}: A Furry Friend to Love!`,
                  text: `Ready to meet your new adorable four-legged family member? Checkout ${pet.name}'s profile here!`,
                  url: `https://findmypet.in/pet/${pet.id}`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`mr-1 rounded-full px-2 py-1 text-xs font-semibold ${Tags[tag]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-primary/80">{pet?.description}</div>
        </div>
      </div>
    </>
  );
}
