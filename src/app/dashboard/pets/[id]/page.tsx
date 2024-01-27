import { PetProfileForm } from "~/components/dashboard/pet-profile-form";

export default async function Pet({
  params: { id },
}: {
  params: { id: string };
}) {
  return <PetProfileForm id={id} />;
}
