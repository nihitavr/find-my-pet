"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  const handleSignIn = async () => {
    await signOut();
  };

  return (
    <button className="button-primary-2" onClick={handleSignIn}>
      Sign Out
    </button>
  );
}
