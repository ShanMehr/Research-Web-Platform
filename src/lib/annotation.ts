import { StoredHighlight } from "@/types/Highlight";
import type {
  Content,
  IHighlight,
  NewHighlight,
  ScaledPosition,
  Comment,
} from "react-pdf-highlighter";

export function processAnnotation(highlight: IHighlight, paper_id: string, user_id: string): StoredHighlight {
  const storedHighlight: StoredHighlight = {
    highlight,
    paper_id,
    user_id,
  };
  return storedHighlight;
}