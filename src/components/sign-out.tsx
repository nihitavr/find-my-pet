"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import Loader from "./ui/loader";

export default function SignOut() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    await signOut();
    setIsSigningIn(false);
  };

  return (
    <Button
      className="flex items-center justify-center gap-2"
      disabled={isSigningIn}
      variant="secondary"
      onClick={handleSignIn}
    >
      <span>Sign Out</span>
      <Loader className="h-5 w-5 border-2" show={isSigningIn} />
    </Button>
  );
}
