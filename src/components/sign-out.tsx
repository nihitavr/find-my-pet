"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOut() {
  const handleSignIn = async () => {
    await signOut();
  };

  return (
    <Button variant="secondary" onClick={handleSignIn}>
      Sign Out
    </Button>
  );
}
