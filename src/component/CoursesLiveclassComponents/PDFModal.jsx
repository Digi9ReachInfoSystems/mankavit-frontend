
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaDownload,
  FaTimes,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { getBackendAssets } from "../../api/authApi";

// PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/* ================== Styles ================== */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  width: min(1000px, 95vw);
  height: min(90vh, 900px);
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;

  &:fullscreen,
  &:-webkit-full-screen {
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0 !important;
  }
`;

/* Header with two rows */
const Header = styled.header`
  border-bottom: 1px solid #eef0f2;
  background: #fff;
  display: grid;
  grid-template-rows: auto auto;
  gap: 6px;
  padding: 10px 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

   @media (max-width: 600px) {
    grid-template-columns: 1fr;  /* stack */
    row-gap: 8px;                /* space between title and buttons row */
  }
`;

const TitleWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

   @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Right = styled.div`
  display: inline-flex;
  justify-self: end;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    justify-self: stretch;
    width: 100%;
    justify-content: space-between;
    gap: 6px;
    flex-wrap: nowrap;           /* keep in one line */
  }
`;

const Left = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

   @media (max-width: 600px) {
    gap: 6px;
  }
`;

const ControlsRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
  align-items: center;
  justify-content: space-between;
`;

/* Buttons */
const Btn = styled.button`
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #0f172a;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background .12s ease, transform .12s ease, box-shadow .12s ease, color .12s ease;

  &:hover { background: #f8fafc; }
  &:active { transform: translateY(0.5px); }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f3f4f6;
    color: #6b7280;
    border-color: #e5e7eb;
  }

  @media (max-width: 600px) {
    padding: 6px 8px;  /* compact */
    font-size: 12px;
  }
`;

const DownloadBtn = styled(Btn)`
  background: #d4b200;
  color: #fff;
  border-color: #d4b200;

  &:hover { background: #c6a500; }
`;

const CloseBtn = styled(Btn)`
  background: #e74c3c;
  color: #fff;
  border-color: #e74c3c;

  &:hover { background: #d94434; }
`;

const Badge = styled.span`
  padding: 2px 8px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
`;

const ViewerWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: #fafafa;
  padding: 16px;            /* keeps the page from hugging edges */

  /* ❌ remove: display: flex; align-items: flex-start; justify-content: center; */
`;

const PageWrap = styled.div`
  display: inline-block;    /* let it be as wide as it needs */
  min-width: fit-content;   /* allow content to be wider than the container */
`;


const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const IframeViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

/* ================== Component ================== */
const PdfModal = ({ file, name, onClose, isDownloadable }) => {
  const [resolvedUrl, setResolvedUrl] = useState(null);
  const [fileType, setFileType] = useState("unknown");

  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);

  const [scale, setScale] = useState(1);           // multiplier for base width
  const [baseWidth, setBaseWidth] = useState(800); // computed from container width (prevents clipping)

  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [jumpVal, setJumpVal] = useState("");

  const modalRef = useRef(null);
  const viewerRef = useRef(null);

  // Fetch signed URL
  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const data = await getBackendAssets(file);
        setResolvedUrl(data.url);
        detectFileType(file);
      } catch {}
    };
    if (file) fetchSignedUrl();
  }, [file]);

  // Compute base width from container to avoid clipping
  const computeBaseWidth = useCallback(() => {
    const wrap = viewerRef.current;
    if (!wrap) return;
    const padding = 32; // ViewerWrap horizontal padding (16px each side)
    const w = Math.max(320, wrap.clientWidth - padding);
    setBaseWidth(w);
  }, []);

  useEffect(() => {
    computeBaseWidth();
    const onResize = () => computeBaseWidth();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeBaseWidth]);

  // Detect file type
  const detectFileType = (url) => {
    if (!url) return;
    const ext = url.split(".").pop().toLowerCase().split("?")[0];
    if (ext === "pdf") setFileType("pdf");
    else if (["doc", "docx"].includes(ext)) setFileType("word");
    else if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(ext))
      setFileType("image");
    else setFileType("unknown");
  };

  // File icon
  const getFileIcon = () => {
    switch (fileType) {
      case "pdf": return <FaFilePdf color="#e74c3c" />;
      case "word": return <FaFileWord color="#2b579a" />;
      case "image": return <FaFileImage color="#4caf50" />;
      default: return <FaFilePdf />;
    }
  };

  // PDF handlers
  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages || 1);
    setPage(1);
    setLoading(false);
    // Fit to width on load to avoid clipping
    computeBaseWidth();
    setScale(1);
  };

  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(numPages, p + 1));

  const zoomIn  = () => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)));
  const fitWidth = () => { computeBaseWidth(); setScale(1); };

  const jumpToPage = () => {
    if (!numPages) return;
    const n = Math.max(1, Math.min(Number(jumpVal || 0), numPages));
    if (Number.isFinite(n)) setPage(n);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const el = modalRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      el.requestFullscreen?.();
      setIsFullscreen(true);
    }
  };

  // Download
  const handleDownload = async () => {
    try {
      if (!resolvedUrl) return;
      const response = await fetch(resolvedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name || "document";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {}
  };

  // Content
  const renderContent = () => {
    switch (fileType) {
      case "pdf":
        return (
          <Document
            file={resolvedUrl}
            onLoadSuccess={onDocLoad}
            loading={<PageWrap style={{ padding: 40 }}>Loading PDF…</PageWrap>}
          >
            <PageWrap>
              <Page
                pageNumber={page}
                width={Math.round(baseWidth * scale)}   // ← fit viewer, no clipping
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </PageWrap>
          </Document>
        );
      case "image":
        return <ImagePreview src={resolvedUrl} alt={name} />;
      case "word":
        return (
          <IframeViewer
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(resolvedUrl)}`}
            title={name}
          />
        );
      default:
        return <div style={{ padding: 40 }}>Loading…</div>;
    }
  };

  return (
    <Backdrop
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isFullscreen) onClose?.();
      }}
    >
      <Modal ref={modalRef}>
        <Header>
          {/* Row 1: left = download; right = fullscreen + close */}
          <Row>
            <Left>
              <TitleWrap>
                {getFileIcon()}
                <Title title={name || "Document"}>{name || "Document"}</Title>
              </TitleWrap>
            </Left>

            <Right>
              {isDownloadable && (
                <DownloadBtn onClick={handleDownload}>
                  <FaDownload size={12} />
                  Download
                </DownloadBtn>
              )}
              <Btn onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </Btn>
              <CloseBtn onClick={onClose}>
                <FaTimes size={12} />
                Close
              </CloseBtn>
            </Right>
          </Row>

          {/* Row 2: navigation + zoom + fit + jump */}
          {fileType === "pdf" && (
            <ControlsRow>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Btn onClick={prevPage} disabled={loading || page <= 1}>Prev</Btn>
                <Badge>{loading ? "…" : `Page ${page} of ${numPages}`}</Badge>
                <Btn onClick={nextPage} disabled={loading || page >= numPages}>Next</Btn>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Btn onClick={zoomOut} disabled={loading}>−</Btn>
                <Badge>{Math.round(scale * 100)}%</Badge>
                <Btn onClick={zoomIn} disabled={loading}>＋</Btn>
                <Btn onClick={fitWidth} disabled={loading}>Fit</Btn>

                <form
                  onSubmit={(e) => { e.preventDefault(); jumpToPage(); }}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <input
                    type="number"
                    min={1}
                    max={numPages || 1}
                    value={jumpVal}
                    onChange={(e) => setJumpVal(e.target.value)}
                    placeholder="Page"
                    style={{
                      width: 70,
                      padding: "6px 8px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  />
                  <Btn type="submit" disabled={loading || !numPages}>Go</Btn>
                </form>
              </div>
            </ControlsRow>
          )}
        </Header>

        <ViewerWrap ref={viewerRef}>{renderContent()}</ViewerWrap>
      </Modal>
    </Backdrop>
  );
};

export default PdfModal;
