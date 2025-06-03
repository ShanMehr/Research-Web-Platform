export interface DocumentMetadata {
  paper_id: string;
  owner_id?: string;
  group_id?: string;
  url: string;
  file_name: string;
  created_at: string; // ISO string, since JS doesn't have datetime type
}
