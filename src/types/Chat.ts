export interface Chat {
  id: string;
  text: string;
  user: string;
  createdAt: Date;
  associatedContextId: string;
}