import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdfjsLib from 'pdfjs-dist/webpack';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  
function PDF(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={props.file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
      </Document>
    </div>
  );
}

export default PDF;