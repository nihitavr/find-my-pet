"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "../ui/calendar";
import { useEffect } from "react";
import { api } from "~/lib/trpc/react";
import ProfileLoadingSkeleton from "./profile-loading-skeleton";
import { ImageInput, ImageInputDisplay } from "../ui/image-input";

const petProfileFormSchema = z.object({
  profileImages: z.array(z.string().url()),
  name: z.string().min(1, {
    message: "Pet name must be at least 1 characters.",
  }),
  gender: z.string().min(1, {
    message: "Gender must be male or female.",
  }),
  type: z.string().min(1, {
    message: "Pet type must be at least 1 characters.",
  }),
  breed: z.string().min(1, {
    message: "Pet breed must be at least 1 characters.",
  }),
  birthdate: z.coerce.date().min(new Date(1965, 1, 1)),
  description: z.string().min(1, {
    message: "Pet description must be at least 1 characters.",
  }),
});

type Props = {
  id?: string;
};

export function PetProfileForm({ id }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof petProfileFormSchema>>({
    resolver: zodResolver(petProfileFormSchema),
    defaultValues: {
      name: "",
      gender: "",
      profileImages: [],
      type: "",
      breed: "",
      birthdate: new Date(),
      description: "",
    },
  });

  const { data, isInitialLoading } = api.pet.getPetProfile.useQuery(
    { id: id! },
    { enabled: !!id, staleTime: 0, cacheTime: 0 },
  );

  const addPet = api.pet.addPetProfile.useMutation();
  const updatePet = api.pet.updatePetProfile.useMutation();

  useEffect(() => {
    if (id && !isInitialLoading && data) {
      // 4. Set the data to the form.
      form.reset({
        profileImages: data.profileImages,
        name: data.name,
        gender: data.gender,
        type: data.type,
        breed: data.breed,
        birthdate: new Date(data.birthdate),
        description: !data.description ? "" : data.description,
      });
    }
  }, [id, isInitialLoading]);

  const onSubmit = async (values: z.infer<typeof petProfileFormSchema>) => {
    const data = {
      id: id,
      name: values.name,
      gender: values.gender,
      profileImages: values.profileImages,
      type: values.type,
      breed: values.breed,
      birthdate: values.birthdate.toISOString(),
      description: values.description,
    };

    if (id) {
      updatePet.mutate(data);
    } else {
      addPet.mutate(data);
    }
  };

  if (isInitialLoading) {
    return <ProfileLoadingSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold">
            {id ? `So what's new about ` : "Tell us about your "}
            <span className="text-primary-dark/90">
              {id ? `${form.getValues()?.name}?` : `Pet!`}
            </span>
          </h1>
        </div>

        {/* Profile Images */}
        <FormField
          control={form.control}
          name="profileImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photos</FormLabel>
              <div className="flex items-center gap-2">
                <ImageInputDisplay field={field} className="h-28 w-28" />
                <FormControl>
                  <ImageInput
                    form={form}
                    field={field}
                    handleUploadUrl="/api/profile-image/upload"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pet Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Pet Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pet Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Cat, Dog, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pet Breed */}
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormControl>
                <Input
                  placeholder="Persian, Indie, Labrador, German Shepherd etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pet Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="Male/Female" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description about your pet."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
