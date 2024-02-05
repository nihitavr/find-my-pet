"use client";

import { Button } from "~/components/ui/button";
import Loader from "../ui/loader";
import { api } from "~/lib/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";
import { Label } from "../ui/label";

export function PetSelectionForm({
  pets,
  qrCodeId,
}: {
  pets: {
    id: string;
    name: string;
    image: string;
  }[];
  qrCodeId: string;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [petId, setPetId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerPetTag = api.petTag.registerPetTag.useMutation();

  const onSubmit = async () => {
    setIsSubmitting(true);
    await registerPetTag.mutateAsync(
      {
        petId,
        qrCodeId,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: "Pet Tag has been registered successfully.",
          });

          router.push(`/pt/${qrCodeId}`);
          router.refresh();
        },
      },
    );

    setIsSubmitting(false);
  };

  console.log(pets);

  return (
    <div className="flex w-full flex-col">
      <RadioGroup
        onValueChange={(value) => setPetId(value)}
        value={petId}
        className="flex flex-col gap-3"
      >
        {pets.map((pet) => (
          <div className="flex items-center" key={pet.id}>
            <div className="flex w-full items-center gap-3">
              <RadioGroupItem value={pet.id} id={`petId:${pet.id}`} />
              <Label
                className="flex items-center gap-3"
                htmlFor={`petId:${pet.id}`}
              >
                <Image
                  width={60}
                  height={60}
                  className="rounded-full"
                  src={pet.image}
                  alt={`${pet.name} image`}
                />
                <span className="w-[80%] break-words font-semibold">
                  {pet.name}
                </span>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className={`w-full pt-5`}>
        <Button
          className="flex w-full items-center justify-center gap-2"
          type="submit"
          disabled={!petId || isSubmitting}
          onClick={onSubmit}
        >
          <span>Register Tag</span>
          <div>
            <Loader className="h-5 w-5 border-2" show={isSubmitting} />
          </div>
        </Button>
      </div>
    </div>
  );
}
