import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// 1️⃣ Point pdfjs at its worker
pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer() {
  // { url, onClose }
  const url = "https://mankavit.blob.core.windows.net/notes/1751695824893-test.pdf";
  const src = `${url}#toolbar=0&navpanes=0&scrollbar=0`;
  const onClose =
    () => { se };
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);

  function onDocumentLoad({ numPages }) {
    setNumPages(numPages);
    setPage(1);
  }

  // Prevent right-click on the canvas to hide browser “Save as…”
  function disableContextMenu(event) {
    event.preventDefault();
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <button onClick={onClose} style={closeBtn}>Close</button>
        <div style={overlay}>
          <button onClick={onClose} style={closeBtn}>Close</button>
          <iframe
            title="PDF Viewer"
            src={src}
            style={iframeStyle}
            sandbox=""                      // no sandbox flags → disables downloads, forms, etc.
            onContextMenu={e => e.preventDefault()}  // block right-click
          />
        </div>
        <div
          style={{ flex: 1, overflow: 'auto', marginTop: 12 }}
          onContextMenu={disableContextMenu}
        >
          <Document
            file={url}
            onLoadSuccess={onDocumentLoad}
            loading={<p>Loading PDF…</p>}
            error={<p style={{ color: 'red' }}>Failed to load PDF</p>}
          >
            {[...Array(numPages)].map((_, idx) => (
              <Page
                key={idx}
                pageNumber={idx + 1}
                width={800}
                onContextMenu={disableContextMenu}
              />
            ))}
          </Document>
        </div>

        {numPages > 1 && (
          <div style={pager}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ◀ Prev
            </button>
            <span style={{ margin: '0 12px' }}>
              Page {page} of {numPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(numPages, p + 1))}
              disabled={page === numPages}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ——— inline styles ———
const overlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modal = {
  background: '#fff',
  borderRadius: 8,
  width: '90%',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
};

const closeBtn = {
  alignSelf: 'flex-end',
  padding: '6px 12px',
  border: 'none',
  background: '#eee',
  cursor: 'pointer',
};

const pager = {
  marginTop: 12,
  textAlign: 'center',
};

const iframeStyle = {
  flex: 1,
  border: 'none',
  width: '100%',
  height: '100%',
};
