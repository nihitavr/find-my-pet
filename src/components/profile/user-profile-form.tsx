"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";
import ProfileLoadingSkeleton from "./profile-loading-skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect } from "react";

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

    updateUser.mutate(data);
  };

  if (isInitialLoading) {
    return <ProfileLoadingSkeleton />;
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
