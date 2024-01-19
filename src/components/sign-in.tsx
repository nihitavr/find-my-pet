"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn({
  callbackUrl,
  ...props
}: {
  callbackUrl?: string;
}) {
  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: callbackUrl ? callbackUrl : "/dashboard",
    });
  };

  return (
    <Button variant="secondary" onClick={handleSignIn} {...props}>
      Sign in
    </Button>
  );
}
