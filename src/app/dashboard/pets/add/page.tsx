import { PetProfileForm } from "~/components/dashboard/pet-profile-form";

export default function AddPet({
  searchParams,
}: {
  searchParams: {
    [k in string]: string | string[] | undefined;
  };
}) {
  return <PetProfileForm petTagId={searchParams.petTagId as string} />;
}
