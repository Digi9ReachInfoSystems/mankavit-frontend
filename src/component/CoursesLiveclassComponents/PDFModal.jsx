import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";

// Use CDN worker (simple & reliable)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// ===== Modal Styles =====
const Backdrop = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  width: min(1000px, 95vw);
  height: min(90vh, 900px);
  border-radius: 8px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  display: flex; align-items: center; gap: 12px; justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0; font-size: 16px; font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const Toolbar = styled.div`
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  > * { font-size: 14px; }
`;

const Btn = styled.button`
  background: #f5f5f5; border: 1px solid #ddd; border-radius: 6px;
  padding: 6px 10px; cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const DownloadLink = styled.a`
  background: #d4b200; color: white; text-decoration: none;
  padding: 6px 10px; border-radius: 6px;
`;

const CloseBtn = styled(Btn)`
  background: #e74c3c; color: #fff; border-color: #e74c3c;
`;

const ViewerWrap = styled.div`
  position: relative;
  overflow: auto;
  background: #fafafa;
`;

const PageWrap = styled.div`
  display: flex; align-items: center; justify-content: center;
  padding: 12px;
`;

const Footer = styled.div`
  border-top: 1px solid #eee;
  padding: 8px 12px;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 13px; color: #666;
`;

// Optional “anti-save” overlay (discourages right-click saves). Note: no web solution can guarantee prevention.
const AntiSaveOverlay = styled.div`
  position: absolute; inset: 0;
  /* Toggle pointer events: for stricter blocking use 'auto', but that also blocks scrolling/selection */
  pointer-events: none;
`;

const ScaleBadge = styled.span`
  padding: 2px 8px; background: #efefef; border-radius: 999px; font-size: 12px;
`;

// ===== Component =====
const PdfModal = ({ file, name, onClose, isDownloadable }) => {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.1);
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef(null);

  // Disable context menu to deter casual saving
  const killContext = useCallback((e) => e.preventDefault(), []);
  useEffect(() => {
    document.addEventListener("contextmenu", killContext);
    return () => document.removeEventListener("contextmenu", killContext);
  }, [killContext]);

  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages || 1);
    setPage(1);
    setLoading(false);
  };

  const prevPage = () => setPage(p => Math.max(1, p - 1));
  const nextPage = () => setPage(p => Math.min(numPages || 1, p + 1));
  const zoomIn = () => setScale(s => Math.min(3, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale(s => Math.max(0.5, +(s - 0.1).toFixed(2)));
  const fitWidth = () => {
    // Try to fit the PDF width to the container (rough heuristic)
    const wrap = viewerRef.current;
    if (!wrap) return;
    // 0.75 density default, 1 CSS px ~ 1 device px here; pick a reasonable width
    const contentWidth = wrap.clientWidth - 24; // minus padding
    // A4 width at 72dpi is ~595pt; react-pdf scales this; use heuristic to get nice fit
    // We’ll pick base width 800 px ~ scale 1.0, then adjust proportionally
    const newScale = Math.max(0.5, Math.min(3, contentWidth / 800));
    setScale(+newScale.toFixed(2));
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomIn(); }
      if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomOut(); }
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [numPages, onClose]);

  return (
    <Backdrop onMouseDown={(e) => {
      // click on backdrop closes (but not clicks inside modal)
      if (e.target === e.currentTarget) onClose?.();
    }}>
      <Modal onContextMenu={killContext}>
        <Header>
          <Title title={name || "Document"}>{name || "Document"}</Title>
          <Toolbar>
            <Btn onClick={prevPage} disabled={loading || page <= 1}>Prev</Btn>
            <span>{loading ? "…" : `${page} / ${numPages}`}</span>
            <Btn onClick={nextPage} disabled={loading || (numPages && page >= numPages)}>Next</Btn>
            <Btn onClick={zoomOut} disabled={loading}>−</Btn>
            <ScaleBadge>{Math.round(scale * 100)}%</ScaleBadge>
            <Btn onClick={zoomIn} disabled={loading}>＋</Btn>
            <Btn onClick={fitWidth} disabled={loading}>Fit Width</Btn>
            {isDownloadable && (
              <DownloadLink href={file} download>Download</DownloadLink>
            )}
            <CloseBtn onClick={onClose}>Close</CloseBtn>
          </Toolbar>
        </Header>

        <ViewerWrap ref={viewerRef}>
          {/* Optional overlay to discourage saves; set pointer-events:auto to block interactions */}
          {!isDownloadable && <AntiSaveOverlay />}
          <Document
            file={file}
            onLoadSuccess={onDocLoad}
            onLoadError={(err) => { console.error(err); setLoading(false); }}
            loading={<PageWrap>Loading PDF…</PageWrap>}
            options={{ cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`, cMapPacked: true }}
          >
            <PageWrap>
              <Page
                pageNumber={page}
                scale={scale}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onRenderSuccess={() => {
                  // Center current page after render
                  if (viewerRef.current) {
                    const el = viewerRef.current;
                    const mid = el.scrollHeight / 2 - el.clientHeight / 2;
                    if (mid > 0) el.scrollTop = Math.min(el.scrollTop, mid);
                  }
                }}
              />
            </PageWrap>
          </Document>
        </ViewerWrap>

        <Footer>
          <span>Tip: use ← → for page, + / − for zoom, Esc to close</span>
          <span>{name}</span>
        </Footer>
      </Modal>
    </Backdrop>
  );
};

export default PdfModal;
