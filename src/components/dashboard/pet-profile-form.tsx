"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ArrowUpRight, CalendarIcon } from "lucide-react";

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
import {
  cn,
  getInstagramUrl,
  getInstagramUsername,
  titleCase,
} from "~/lib/utils";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { api } from "~/lib/trpc/react";
import { ImageInput, ImageInputDisplay } from "../ui/image-input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  DEFAULT_MAX_PET_PROFILE_IMAGES,
  PetBehaviourTagsOptions,
  REGEX,
} from "~/lib/constants";
import { useToast } from "../ui/use-toast";
import Loader from "../ui/loader";
import { useRouter } from "next/navigation";
import ProfileFormLoadingSkeleton from "../ui/profile-form-loading-skeleton";
import Link from "next/link";
import MultipleSelector from "~/components/ui/multiple-selector";
import { Label } from "../ui/label";

const petProfileFormSchema = z.object({
  profileImages: z.array(z.string().url()),
  name: z.string().min(1, {
    message: "Pet name must be at least 1 characters.",
  }),
  behaviorTags: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      disable: z.boolean().optional(),
    }),
  ),
  instagramUsername: z
    .string()
    .regex(REGEX.instagramUsername, {
      message: "Invalid Instagram username.",
    })
    .or(z.string().regex(REGEX.emptyString)),
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
  qrCodeId?: string;
};

export function PetProfileForm({ id, qrCodeId }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof petProfileFormSchema>>({
    resolver: zodResolver(petProfileFormSchema),
    defaultValues: {
      name: "",
      gender: "",
      behaviorTags: [],
      instagramUsername: "",
      profileImages: [],
      type: "",
      breed: "",
      birthdate: new Date(),
      description: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

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
        behaviorTags: data.behaviourTags.map((tag) => ({
          label: titleCase(tag.split("_").join(" ")),
          value: tag,
        })),
        instagramUsername: getInstagramUsername(
          (data.socialMediaLinks as any)?.instagram,
        ),
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
      socialMediaLinks: {
        instagram: getInstagramUrl(values.instagramUsername),
      },
      profileImages: values.profileImages,
      type: values.type,
      breed: values.breed,
      behaviourTags: values.behaviorTags.map((tag) => tag.value),
      birthdate: values.birthdate.toISOString(),
      description: values.description,
      qrCodeId: qrCodeId,
    };

    setIsSubmitting(true);

    if (id) {
      await updatePet.mutateAsync(data, {
        onSuccess: (data) => {
          form.reset({
            profileImages: data.profileImages,
            name: data.name,
            instagramUsername: getInstagramUsername(
              (data.socialMediaLinks as any)?.instagram,
            ),
            gender: data.gender,
            type: data.type,
            breed: data.breed,
            behaviorTags: data.behaviourTags.map((tag) => ({
              label: titleCase(tag.split("_").join(" ")),
              value: tag,
            })),
            birthdate: new Date(data.birthdate),
            description: !data.description ? "" : data.description,
          });
          toast({
            variant: "success",
            description: "Pet profile updated successfully!",
          });
          router.push("/dashboard/pets");
        },
      });
    } else {
      await addPet.mutateAsync(data, {
        onSuccess: () => {
          let toastMessage = "Pet profile created successfully!";
          let nextUrl = `/dashboard/pets`;

          if (qrCodeId) {
            toastMessage =
              "Pet profile created successfully and registeted it to tha tag!";
            nextUrl = `/pt/${qrCodeId}`;
          }

          toast({
            variant: "success",
            description: toastMessage,
          });

          router.push(nextUrl);
          router.refresh();
        },
      });
    }

    setIsSubmitting(false);
  };

  if (isInitialLoading) return <ProfileFormLoadingSkeleton />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <div className="flex items-center justify-start gap-2">
          <h1 className="text-xl font-semibold">
            {id ? `So what's new about ` : "Tell us about your "}
            <span className="text-primary/90">
              {id ? `${form.getValues()?.name}?` : `Pet!`}
            </span>
          </h1>
        </div>
        <div className="flex items-center justify-start gap-2">
          <h1 className="font-semibold">Basic Info</h1>
          {id && (
            <Link
              href={`/pet/${id}`}
              target="_blank"
              className="flex items-center justify-end text-sm text-blue-700 hover:underline"
            >
              (<span>View Profile</span> <ArrowUpRight size={15} />)
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-5">
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
                      maxFiles={DEFAULT_MAX_PET_PROFILE_IMAGES}
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

          <div className="flex gap-8">
            {/* Pet Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-2 py-1">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row items-center gap-3"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dog" />
                        </FormControl>
                        <FormLabel className="font-normal">Dog</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cat" />
                        </FormControl>
                        <FormLabel className="font-normal">Cat</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                <FormItem className="space-y-2 py-1">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row items-center gap-3"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <FormField
            control={form.control}
            name="behaviorTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={PetBehaviourTagsOptions}
                    maxSelected={10}
                    placeholder="Select tags that describes your pet..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pet Birth Date */}
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Date of birth</Label>
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

          {/* Pet Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-44"
                    placeholder="Description about your pet."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h1 className="pt-10 font-semibold">Social Media Info</h1>

        <div>
          {/* Instagram Link with name socialMediaLinks.instagram*/}
          <FormField
            control={form.control}
            name="instagramUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Username</FormLabel>
                <FormControl>
                  <Input placeholder="Instagram Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={`flex w-full justify-end pt-5`}>
          <Button
            className="flex w-full items-center justify-center gap-2"
            type="submit"
            disabled={!form.formState.isDirty || isSubmitting}
          >
            <span>{qrCodeId ? "Create Pet & Register Tag" : "Save"}</span>
            <div>
              <Loader className="h-5 w-5 border-2" show={isSubmitting} />
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}
