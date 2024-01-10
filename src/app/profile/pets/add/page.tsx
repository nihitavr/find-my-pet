"use client";

import { Pet } from "@prisma/client";
import { api } from "~/lib/trpc/react";

export default function AddPet() {
  const addPet = api.pet.addPet.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries()) as unknown;
    console.log("body: ", body);

    addPet.mutate(body as Pet);
  };

  return (
    <div className="text-primary">
      <h1 className="text-xl font-semibold">Add Pet</h1>

      <form className="mt-5 flex flex-col gap-5" onSubmit={onSubmit}>
        {/* Pet Name, Type, Breed, Age */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold opacity-80"
            htmlFor="pet-name"
          >
            Name
          </label>
          <input
            type="text"
            id="pet-name"
            placeholder="Name"
            name="name"
            className="w-full rounded-md border px-4 py-2 "
          />
        </div>

        {/* Pet Type */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold opacity-80"
            htmlFor="pet-type"
          >
            Type
          </label>
          <input
            type="text"
            id="pet-type"
            name="type"
            placeholder="Cat, Dog, etc."
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        {/* Pet Breed */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold opacity-80"
            htmlFor="pet-breed"
          >
            Breed
          </label>
          <input
            type="text"
            id="pet-breed"
            name="breed"
            placeholder="Persian, Labrador, etc."
            className="w-full rounded-md border px-4 py-2 "
          />
        </div>

        {/* Pet Birthday */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold opacity-80"
            htmlFor="pet-birthday"
          >
            Birth Date
          </label>
          <input
            type="date"
            id="pet-birthday"
            name="birthdate"
            placeholder="31/01/2015"
            className="w-full rounded-md border px-4 py-2 "
          />
        </div>

        {/* Pet Description */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold opacity-80"
            htmlFor="pet-description"
          >
            Description
          </label>
          <textarea
            id="pet-description"
            placeholder="Pet Description"
            name="description"
            className="h-32 w-full rounded-md border px-4 py-2"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="button-dark">
          Submit
        </button>
      </form>
    </div>
  );
}
