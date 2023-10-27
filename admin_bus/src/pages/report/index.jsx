import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import React from "react";
const exportPDFWithMethod = () => {
  let element = container.current || document.body;
  savePDF(element, {
    paperSize: "auto",
    margin: 40,
    fileName: `Report for ${new Date().getFullYear()}`,
  });
};

function Report() {
  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);
  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `Report for ${new Date().getFullYear()}`,
    });
  };

  return (
    <div className="mx-9">
      <div>
        <div>
          <button
            className="my-6 px-[40px] py-4 text-white rounded-md  place-items-end"
            style={{ background: "#04062C" }}
            onClick={exportPDFWithMethod}
            //disabled={!pdfRow}
          >
            Download PDF
          </button>
        </div>
        <div>
          <PDFExport
            ref={pdfExportComponent}
            paperSize="auto"
            //margin={40}
            fileName={`Report for ${new Date().getFullYear()}`}
            author="KendoReact Team"
          >
            <div
              ref={container}
              style={{
                width: "100%",
              }}
            >
              dsdsdsdsdd
            </div>
          </PDFExport>
        </div>
      </div>
    </div>
  );
}

export default Report;
