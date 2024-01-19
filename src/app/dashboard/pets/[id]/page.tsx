"use client";

import { useParams } from "next/navigation";
import { PetProfileForm } from "~/components/dashboard/pet-profile-form";

export default function Pet() {
  const params = useParams();

  return <PetProfileForm id={params.id as string} />;
}
