import PetProfile from "~/components/pet-profile";
import { z } from "zod";
import NotFound from "~/components/ui/errors/not-found";
import { isValidCuid } from "~/lib/utils";

export const generateMetadata = () => {
  return { title: "Find My Pet - Pet Profile" };
};

export default async function PetProfilePage({
  params,
}: {
  params: { id: string };
}) {
  if (!isValidCuid(params.id)) {
    return <NotFound />;
  }

  return <PetProfile id={params.id} />;
}
