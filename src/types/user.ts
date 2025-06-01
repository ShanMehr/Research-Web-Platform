export type User = {
  id: string;
  externalId: string | null;
  primaryEmailAddressId: string | null;
  primaryEmailAddress: string | null;
  primaryPhoneNumberId: string | null;
  primaryPhoneNumber: string | null;
  username: string | null;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  hasImage: boolean;
  emailAddresses: string[];
  phoneNumbers: string[];
  updatedAt: Date | null;
  createdAt: Date | null;
};