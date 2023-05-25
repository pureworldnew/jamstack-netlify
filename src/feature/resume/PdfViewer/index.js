import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintPdf from "./PrintPdf";

function PdfViewer({ result }) {
   return (
      <PDFViewer width="100%" height={window.innerHeight}>
         <PrintPdf {...result} />
      </PDFViewer>
   );
}

export default PdfViewer;
