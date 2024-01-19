"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Loader from "../ui/loader";
import { api } from "~/lib/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export function PetSelectionForm({
  pets,
  petTagId,
}: {
  pets: {
    id: string;
    name: string;
  }[];
  petTagId: string;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [open, setOpen] = React.useState(false);
  const [petId, setPetId] = React.useState("");

  const registerPetTag = api.petTag.registerPetTag.useMutation();

  const onSubmit = async () => {
    await registerPetTag.mutateAsync(
      {
        petId,
        petTagId,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            description: "Pet Tag has been registered successfully.",
          });

          setTimeout(() => {
            router.push(`/pt/${petTagId}`);
            router.refresh();
          }, 1000);
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {petId
              ? pets.find((pet) => pet.id === petId)?.name
              : "Select pet..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search pet..." />
            <CommandEmpty>No Pet found.</CommandEmpty>
            <CommandGroup>
              {pets.map((pet) => (
                <CommandItem
                  key={pet.id}
                  value={pet.id}
                  onSelect={(currentValue) => {
                    setPetId(currentValue === petId ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      petId === pet.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {pet.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className={`w-full pt-5`}>
        <Button
          className="flex w-full items-center justify-center gap-2"
          type="submit"
          disabled={!petId}
          onClick={onSubmit}
        >
          <span>Submit</span>
          <div>
            <Loader className="h-5 w-5 border-2" show={false} />
          </div>
        </Button>
      </div>
    </div>
  );
}
