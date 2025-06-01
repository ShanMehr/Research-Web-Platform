import { atom } from "jotai";
import { UserResource } from '@clerk/types'; 
import { User } from "@/types/user";
import { atomWithStorage } from "jotai/utils";

const dummyUser: User = {
  id: "123",
  externalId: null,
  primaryEmailAddressId: null,
  primaryEmailAddress: null,
  primaryPhoneNumberId: null,
  primaryPhoneNumber: null,
  username: "null",
  fullName: null,
  firstName: null,
  lastName: null,
  imageUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  hasImage: true,
  emailAddresses: [],
  phoneNumbers: [],
  updatedAt: null,
  createdAt: null,
};

export const userAtom = atom<UserResource | null | undefined>(undefined);
export const userAtomLocalStorage = atomWithStorage<User | null | undefined>(
  'user', dummyUser
);

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
    set(userAtomLocalStorage, dummyUser);
  }
);


export const clerkUserToUser = (user: UserResource) => {
  const localUser: User = {
    id: user.id,
    externalId: user.externalId,
    primaryEmailAddressId: user.primaryEmailAddressId,
    primaryEmailAddress: user.primaryEmailAddress?.emailAddress || null,
    primaryPhoneNumber: user.primaryPhoneNumber?.phoneNumber || null,
    primaryPhoneNumberId: user.primaryPhoneNumberId,
    username: user.username,
    fullName: user.fullName,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    hasImage: user.hasImage,
    emailAddresses: user.emailAddresses.map((email) => email.emailAddress),
    phoneNumbers: user.phoneNumbers.map((phone) => phone.phoneNumber),
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
  return localUser;
};