"use client";

import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useRef,
  use, 
} from "react";

import { useAtom } from "jotai";
import { userAtomLocalStorage } from "@/stores/auth";

import {
  AreaHighlight,
  Highlight,
  PdfHighlighter,
  PdfLoader,
  Popup,
  Tip,
} from "react-pdf-highlighter";

import type {
  Content,
  IHighlight,
  NewHighlight,
  ScaledPosition, 
} from "react-pdf-highlighter";

import { Sidebar } from "./Sidebar";
import { Spinner } from "./Spinner";

import "./style/Reader.css";

// bundled styles
import "./style/react-pdf-highlighter.css";

import { testHighlights as _testHighlights } from "./test-highlights";
import { Button } from "../ui/button";
import { DocumentMetadata } from "@/types/Document";

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const PRIMARY_PDF_URL =
  "http://localhost:8000/document?paper_id=b32314f4-b5f5-447d-8f36-4c6b702102a4";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480";

export function Reader(paperLink) {
  // const searchParams = new URLSearchParams(document.location.search);
  const initialUrl = PRIMARY_PDF_URL;
  const [user, setUser] = useAtom(userAtomLocalStorage);
  const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;
  const [url, setUrl] = useState(initialUrl);
  const [highlights, setHighlights] = useState<Array<IHighlight>>(
    []
  );

  async function saveHighlights(highlights: Array<IHighlight>) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INFERENCE_SERVER_API}/highlights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // highlights: processedAnnotations,
        highlights: highlights,
        paper_id: "paper_id", // Replace with actual paper ID
        user_id: "user_id", // Replace with actual user ID
      }),
    });
  }

  useEffect(() => {
    const paper_id = paperLink.children;
    const fetchHighlights = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_INFERENCE_SERVER_API}/highlights/${paper_id}/${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data) {
        return;
      }
      const fetchedHighlights: Array<IHighlight> = data.highlights || [];
      setHighlights(fetchedHighlights);
    };
    const fetchUrl = async (paperUrlParam: string) => {
      if (!paperUrlParam && typeof paperUrlParam !== "string") {
        return;
      }
      const metadataUrl = new URL(
        `${process.env.NEXT_PUBLIC_INFERENCE_SERVER_API}/document`
      );
      metadataUrl.searchParams.append("paper_id", paperUrlParam);
      const response = await fetch(metadataUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: DocumentMetadata = await response.json();
      if (!data.url) {
        return paperUrlParam;
      }
      const pdfEndpoint = `/api/documents/?path=${data.url}`;
      setUrl(pdfEndpoint);
    };
    fetchUrl(paper_id);
    // fetchHighlights();
  });
   
  useEffect(() => {
    const handleBeforeUnload = async(event: BeforeUnloadEvent) => {
      console.log(highlights)
      return
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [highlights]);


  const resetHighlights = () => {
    setHighlights([]);
  };

  const toggleDocument = () => {
    const newUrl =
      url === paperLink || PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;
    setUrl(newUrl);
    setHighlights(testHighlights[newUrl] ? [...testHighlights[newUrl]] : []);
  };

  const scrollViewerTo = useRef((highlight: IHighlight) => {});

  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());
    if (highlight) {
      scrollViewerTo.current(highlight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
    return () => {
      window.removeEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false,
      );
    };
  }, [scrollToHighlightFromHash]);

  const getHighlightById = (id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  };

  const addHighlight = (highlight: NewHighlight) => {
    setHighlights((prevHighlights) => [
      { ...highlight, id: getNextId() },
      ...prevHighlights,
    ]);
  };

  const updateHighlight = (
    highlightId: string,
    position: Partial<ScaledPosition>,
    content: Partial<Content>,
  ) => {
    setHighlights((prevHighlights) =>
      prevHighlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    );
  };

  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      {/* <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        toggleDocument={toggleDocument}
      /> */}
      <div
        style={{
          height: "100vh",
          width: "50vw",
          position: "relative",
        }}
      >
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              scrollRef={(scrollTo) => {
                scrollViewerTo.current = scrollTo;
                scrollToHighlightFromHash();
              }}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection
              ) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={(comment) => {
                    addHighlight({ content, position, comment });
                    hideTipAndSelection();
                  }}
                />
              )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo
              ) => {
                const isTextHighlight = !highlight.content?.image;

                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    isScrolledTo={isScrolledTo}
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      updateHighlight(
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) }
                      );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, (highlight) => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                  >
                    {component}
                  </Popup>
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </div>
    </div>
  );
}