import { atom } from "jotai";
import { UserResource } from '@clerk/types'; // For type safety

// Store the user object
export const userAtom = atom<UserResource | null | undefined>(undefined);

export const isSignedInAtom = atom<boolean | null | undefined>(undefined);

export const isClerkLoadedAtom = atom<boolean>(false);

export const authIsLoadingAtom = atom(
  (get) => !get(isClerkLoadedAtom) || get(isSignedInAtom) === undefined
);
export const isAuthenticatedAtom = atom(
  (get) => get(isClerkLoadedAtom) && get(isSignedInAtom) === true
);

export const clearAtom = atom(
  null,
  (get, set) => {
    set(isSignedInAtom, undefined);
    set(isClerkLoadedAtom, false);
    set(userAtom, undefined);
  }
);