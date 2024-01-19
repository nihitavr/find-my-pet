import PetProfile from "~/components/pet-profile";

// export const metadata = {
//   title: "Find My Pet - Pet Profile",
// };

export default async function PetProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return <PetProfile id={params.id} />;
}
