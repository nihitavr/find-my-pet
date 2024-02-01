import { PetProfileForm } from "~/components/dashboard/pet-profile-form";

export default function AddPet({
  searchParams,
}: {
  searchParams: {
    [k in string]: string | string[] | undefined;
  };
}) {
  return <PetProfileForm qrCodeId={searchParams.qrCodeId as string} />;
}
