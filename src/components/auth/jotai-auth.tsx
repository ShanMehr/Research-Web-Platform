"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  isSignedInAtom, 
  isClerkLoadedAtom, 
  userAtom, 
  userAtomLocalStorage,
  clerkUserToUser
} from "@/stores/auth";
import { useUser } from "@clerk/nextjs";

export default function JotaiAuthContext() {
  const { user, isSignedIn, isLoaded } = useUser();

  const [ , setIsSignedInAtom] = useAtom(isSignedInAtom);
  const [ , setIsClerkLoadedAtom] = useAtom(isClerkLoadedAtom);
  const [ , setUserAtom] = useAtom(userAtom);
  const [ localUser , setUserAtomLocalStorage] = useAtom(userAtomLocalStorage);

  useEffect(() => {
    const clerkLoaded = isSignedIn && isLoaded;
    if (clerkLoaded) {
      setIsSignedInAtom(isSignedIn);
      setIsClerkLoadedAtom(isLoaded);
      setUserAtom(user);
      if (!localUser) {
        setUserAtomLocalStorage(clerkUserToUser(user));
      }
    } else {
      setIsSignedInAtom(undefined);
      setIsClerkLoadedAtom(false);
      setUserAtom(undefined);
    }
  }, [
    user,
    isSignedIn,
    isLoaded,
    setIsSignedInAtom,
    setIsClerkLoadedAtom,
    setUserAtom,
    setUserAtomLocalStorage,
    localUser,
  ]);

  return (
    null
  );
}

