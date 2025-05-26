import type {
  IHighlight,
} from "react-pdf-highlighter"; 

export interface StoredHighlight extends IHighlight {
  paperId: string;
  userId?: string;
}