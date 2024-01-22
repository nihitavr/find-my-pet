import PetAndPetTagRegistrationForm from "~/components/dashboard/pet-and-pet-tag-resigtration-form";

export default function PetSelectionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <PetAndPetTagRegistrationForm petTagId={searchParams.petTagId as string} />
  );
}
