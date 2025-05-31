"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import {isSignedInAtom, isClerkLoadedAtom, userAtom } from "@/stores/auth";
import { useUser } from "@clerk/nextjs";
export default function JotaiAuthContext() {
  const { user, isSignedIn, isLoaded } = useUser();

  const [ , setIsSignedInAtom] = useAtom(isSignedInAtom);
  const [ , setIsClerkLoadedAtom] = useAtom(isClerkLoadedAtom);
  const [ , setUserAtom] = useAtom(userAtom);

  useEffect(() => {
    const clerkLoaded = isSignedIn && isLoaded;
    if (clerkLoaded) {
      setIsSignedInAtom(isSignedIn);
      setIsClerkLoadedAtom(isLoaded);
      setUserAtom(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setIsSignedInAtom(undefined);
      setIsClerkLoadedAtom(false);
      setUserAtom(undefined);
      localStorage.removeItem("user");
    }
  }, [
    user,
    isSignedIn,
    isLoaded,
    setIsSignedInAtom,
    setIsClerkLoadedAtom,
    setUserAtom,
  ]);

  return (
    null
  );
}

