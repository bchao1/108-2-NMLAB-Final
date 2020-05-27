import React, { useState, Fragment } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';

import "./PDF.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  
class PDF extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNumber: 0,
      numPages: 0,
    };
  }

  onDocumentLoadSuccess = res => {
    this.setState({
      numPages:res.numPages, 
      pageNumber: 1
    })
  }

  handleClick = dir => {
    this.setState(state => {
      let newPageNumber = state.pageNumber;
      if(dir == 'prev' && state.pageNumber > 1) newPageNumber = state.pageNumber - 1;
      else if(dir == 'next' && state.pageNumber < state.numPages) newPageNumber = state.pageNumber + 1;
      return { pageNumber: newPageNumber};
    })
  }

  render(){
    return (
      <div className="wrapper">
        <Document
          className="doc"
          file={this.props.file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          options={options}
          height={450}
        >
          <Page height={440} pageNumber={this.state.pageNumber} renderTextLayer={false} renderInteractiveForms={false}/>
        </Document>
        <div className="buttons">
          <div onClick={() => this.handleClick('prev')} className="page-button">&#8592;</div>
          <div onClick={() => this.handleClick('next')} className="page-button">&#8594;</div>
        </div>
      </div>
    );
  }
}

export default PDF;