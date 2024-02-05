import { api } from "~/lib/trpc/server";
import Link from "next/link";
import { Button } from "../ui/button";
import { PetSelectionForm } from "./pet-selection-form";
import { getServerAuthSession } from "~/lib/auth";
import Unauthorised from "../ui/errors/unauthorised";
import { PawPrint } from "lucide-react";

export default async function PetAndPetTagRegistrationForm({
  qrCodeId,
}: {
  qrCodeId: string;
}) {
  const auth = await getServerAuthSession();

  if (!auth?.user) return <Unauthorised />;

  const pets = await api.pet.getPetProfiles.query();

  return (
    <div className="flex flex-col gap-5 lg:px-72">
      <div className="font-semibold1 my-4 text-center text-2xl font-semibold">
        Hi, {auth.user.name}!
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Select Pet</h1>
        <span className="font-semibold">OR</span>
        <Link href={`/dashboard/pets/add?qrCodeId=${qrCodeId}`}>
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-1"
          >
            Add New Pet
            <PawPrint strokeWidth={2.5} className="h-4 w-4" />
          </Button>{" "}
        </Link>
      </div>

      {pets.length ? (
        <PetSelectionForm
          qrCodeId={qrCodeId}
          pets={pets.map((pet) => {
            const image = pet.profileImages?.[0]
              ? pet.profileImages?.[0]
              : pet.type === "dog"
                ? "/dog-avatar.jpeg"
                : "/cat-avatar.jpeg";
            return { name: pet.name, id: pet.id, image: image };
          })}
        />
      ) : (
        <div className="text-center">
          You currently have no pet profiles. Click{" "}
          <span className="text-primary">
            <Link href={`/dashboard/pets/add?qrCodeId=${qrCodeId}`}>
              Add New Pet
            </Link>
          </span>
          .
        </div>
      )}
    </div>
  );
}
