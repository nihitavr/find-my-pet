import { Instagram } from "lucide-react";
import { Share } from "~/components/ui/icons";
import NotFound from "~/components/ui/errors/not-found";
import { api } from "~/lib/trpc/server";
import { getTimePassed, titleCase } from "~/lib/utils";
import OwnerInfoButtons from "./ui/owner-info-call-buttons";
import PhotoCasousel from "./photo-carousel";
import { PetBehaviourTagsOptions } from "~/lib/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  qrCodeId?: string | null;
  recordLocation?: boolean;
};

export default async function PetProfile({
  id,
  qrCodeId,
  recordLocation,
}: Props) {
  const pet = await api.pet.getPet.query({ id });

  if (!pet) return <NotFound />;

  const user = await api.user.getUser.query({ id: pet.userId });

  if (pet.profileImages.length === 0) pet.profileImages.push("");

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full lg:w-2/5">
        {/* Image Section */}
        <PhotoCasousel
          images={pet.profileImages}
          className="aspect-square w-full"
          imageClassName="rounded-none"
          defaultImage={
            pet.type === "dog" ? "/dog-avatar.jpeg" : "/cat-avatar.jpeg"
          }
        />

        {/* Details Section */}
        <div className="-mt-5 flex w-full -translate-y-0 flex-col gap-4 rounded-t-3xl bg-white p-6">
          {/* Breed, Type, Name, Gender, Birthdate */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm  text-foreground/80">
                {pet?.breed} ({titleCase(pet?.type)})
              </span>
              <span className="text-2xl font-semibold text-foreground">
                {pet?.name}
              </span>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <span>{titleCase(pet?.gender)}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-[#999999]"></div>
                <span>{getTimePassed(pet?.birthdate)}</span>
              </div>
            </div>

            {/* Insta and Share button */}
            <div className="flex h-full items-center gap-3">
              <Link href={`/user/${user?.id}/pets`}>
                <div className="relative aspect-square h-[22px] opacity-60 hover:opacity-90">
                  <Image
                    fill
                    className="aspect-square h-full"
                    style={{ objectFit: "cover" }}
                    src="/pet-family-icon.svg"
                    alt="pet profile family icon"
                  />
                </div>
              </Link>
              {(pet.socialMediaLinks as any).instagram && (
                <a
                  href={(pet.socialMediaLinks as any).instagram}
                  target="_blank"
                >
                  <Instagram className="cursor-pointer text-foreground/50 hover:text-foreground" />
                </a>
              )}
              <Share
                className="cursor-pointer text-foreground/50 hover:text-foreground"
                shareInfo={{
                  title: `${pet.name}: A Furry Friend to Love!`,
                  text: `Ready to meet your new adorable four-legged family member? Checkout ${pet.name}'s profile here!`,
                  url: `https://findmypet.in/pet/${pet.id}`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {pet.behaviourTags.map((tag) => {
              const option = PetBehaviourTagsOptions.find(
                (option) => option.value === tag,
              );
              return (
                <span
                  key={tag}
                  className={`mr-1 rounded-full px-2 py-1 text-xs font-semibold ${option?.badgeClassname}`}
                >
                  {option?.label}
                </span>
              );
            })}
          </div>

          <div className="text-foreground/80">{pet?.description}</div>

          {user?.phoneNumber && qrCodeId && (
            <OwnerInfoButtons
              phoneNumber={user.phoneNumber}
              petId={id}
              qrCodeId={qrCodeId}
              recordLocation={recordLocation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
