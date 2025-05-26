import { StoredHighlight } from "@/types/Highlight";
import type {
  Content,
  IHighlight,
  NewHighlight,
  ScaledPosition,
  Comment,
} from "react-pdf-highlighter";

export function processHighlight(highlight: IHighlight, paper_id: string, user_id: string): StoredHighlight {
  const storedHighlight = {
    ...highlight,
    paper_id: paper_id,
    user_id: user_id,
  };
  return storedHighlight;
}