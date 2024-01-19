import { api } from "~/lib/trpc/server";
import Link from "next/link";
import { Button } from "../ui/button";
import { PetSelectionForm } from "./pet-selection-dropdown";

export default async function PetAndPetTagRegistrationForm({
  petTagId,
}: {
  petTagId: string;
}) {
  const pets = await api.pet.getPetProfiles.query();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Select Pet</h1>
        <span className="font-semibold">OR</span>
        <Link href={`/dashboard/pets/add?petTagId=${petTagId}`}>
          <Button variant="outline">
            <span>Add New Pet</span>
          </Button>
        </Link>
      </div>

      <PetSelectionForm
        petTagId={petTagId}
        pets={pets.map((pet) => {
          return { name: pet.name, id: pet.id };
        })}
      />

      {/* <div className="flex w-full flex-col items-center justify-center">
        <hr className="border-1 w-full" />
        <span className="font-semibold">OR</span>
        <hr className="border-1 w-full" />
      </div> */}
    </div>
  );
}
