import { Instagram, Share } from "lucide-react";
import Image from "next/image";
import NotFound from "~/components/ui/not-found";
import { api } from "~/lib/trpc/server";

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
  const data = await api.pet.getPet.query({ id: params.id });

  if (!data) return <NotFound />;

  // Pick random five elements from the Tags object
  const tags = Object.keys(Tags)
    .sort(() => Math.random() - Math.random())
    .slice(0, 7);

  return (
    <div className="flex flex-col items-center">
      {/* Image Section */}
      <div className="relative aspect-square w-full md:w-2/5">
        <Image
          src={
            data.profileImages[0]
              ? data.profileImages[0]
              : data.type === "dog"
                ? "/dog-avatar.jpeg"
                : "/cat-avatar.jpeg"
          }
          alt="Profile Image"
          fill
          style={{ objectFit: "cover" }}
          className="md:rounded-3xl"
        />
      </div>

      {/* Details Section */}
      <div className="-mt-5 flex w-full -translate-y-0 flex-col gap-4 rounded-t-3xl bg-white p-6 md:w-2/5">
        {/* Breed, Type, Name, Gender, Birthdate */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm  text-primary/80">
              {data?.breed} ({data?.type})
            </span>
            <span className="text-2xl font-semibold text-primary">
              {data?.name}
            </span>
            <span className="text-sm text-primary/80">
              {data?.gender} | {data?.birthdate?.getDate()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Instagram className="cursor-pointer text-primary/50 hover:text-primary" />
            <Share className="cursor-pointer text-primary/50 hover:text-primary" />
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

        <div className="text-primary/80">{data?.description}</div>
      </div>
    </div>
  );
}
