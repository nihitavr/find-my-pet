"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import Loader from "./ui/loader";
import { cn } from "~/lib/utils";

export default function SignIn({
  callbackUrl,
  className,
  ...props
}: {
  callbackUrl?: string;
  className?: string;
}) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    await signIn("google", {
      callbackUrl: callbackUrl ? callbackUrl : "/dashboard",
    });
    setIsSigningIn(false);
  };

  return (
    <Button
      className={cn("flex items-center justify-center gap-2", className)}
      variant="default"
      disabled={isSigningIn}
      onClick={handleSignIn}
      {...props}
    >
      <span>Sign In</span>
      <Loader className="h-5 w-5 border-2" show={isSigningIn} />
    </Button>
  );
}
