"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";
import ProfileFormLoadingSkeleton from "../ui/profile-form-loading-skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../ui/loader";
import { useToast } from "../ui/use-toast";

const userProfileFormSchema = z.object({
  name: z.string().min(1, {
    message: "Pet name must be at least 1 characters.",
  }),
  email: z.string().email("Email must be a valid."),
  phoneNumber: z
    .string()
    .regex(/^[0]?[6789]\d{9}$/, { message: "Invalid Phone Number" }),
});

export function UserProfileForm() {
  const router = useRouter();
  const petTagId = useSearchParams().get("petTagId");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  const { data: userData, isInitialLoading } =
    api.user.getUserProfile.useQuery();
  const updateUser = api.user.updateUserProfile.useMutation();

  useEffect(() => {
    if (!isInitialLoading && userData) {
      // 4. Set the data to the form.
      form.reset({
        name: userData.name!,
        email: userData.email!,
        phoneNumber: userData.phoneNumber!,
      });
    }
  }, [isInitialLoading, userData]);

  const onSubmit = async (values: z.infer<typeof userProfileFormSchema>) => {
    const data = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    setIsSubmitting(true);
    await updateUser.mutateAsync(data, {
      onSuccess: (userData) => {
        form.reset({
          name: userData.name!,
          email: userData.email!,
          phoneNumber: userData.phoneNumber!,
        });

        if (!petTagId) {
          toast({
            variant: "success",
            description: "Owner Profile updated successfully!",
          });

          return;
        }

        router.push(`/dashboard/pet-tags/pet-selection?petTagId=${petTagId}`);
      },
      onError: (error) => {
        toast({
          variant: "failure",
          description: error.message,
        });
      },
    });
    setIsSubmitting(false);
  };

  if (isInitialLoading) {
    return <ProfileFormLoadingSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Owner Profile</h1>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Owner Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end pt-7">
          <Button
            className="flex gap-2"
            type="submit"
            disabled={
              (form.formState.isDirty || petTagId) && !isSubmitting
                ? false
                : true
            }
          >
            <span>{petTagId ? "Next" : "Save"}</span>
            <Loader className="h-5 w-5 border-2" show={isSubmitting} />
          </Button>
        </div>
      </form>
    </Form>
  );
}
