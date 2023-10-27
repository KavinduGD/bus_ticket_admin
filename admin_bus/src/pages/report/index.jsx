import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";

const exportPDFWithMethod = () => {
  let element = container.current || document.body;
  savePDF(element, {
    paperSize: "auto",
    margin: 40,
    fileName: `Report for ${new Date().getFullYear()}`,
  });
};

function Report() {
  const [routeId, setRouteId] = useState("");
  const [busCount, setBusCount] = useState("");
  const [justification, setJustification] = useState("");

  const { roadRoutes, dispatch } = useRoadRouteContext();

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
    <div className="mx-9 ">
      <div className="flex w-full ">
        <div className="w-[75%]">
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
              <div className="demandProductTable  rounded-md  overflow-hidden bg-white ">
                <div className="border-solid border-2 border-black h-full m-10 mt-3">
                  <div className="flex justify-center w-full mt-[20px] border-b-2 border-black pb-[20px]">
                    <div className="flex gap-[60px] items-center  w-full  pl-[60px] ">
                      <div>
                        <img
                          src="https://res-console.cloudinary.com/dnoobzfxo/thumbnails/v1/image/upload/v1697876127/MzYwX0ZfNDkxMjQyNDcwX1dkU3B3S1JNWWlIcVR2UkJScHNINzJjTTRnMVZXTDIyLXJlbW92ZWJnLXByZXZpZXdfdXIzMTVl/grid_landscape"
                          alt=""
                          className="w-[110px]"
                        />
                      </div>
                      <div className="font-tinos font-bold text-[45px] tracking-wider">
                        Bus Request Letter
                      </div>
                    </div>
                  </div>
                  <div className="w-full  flex justify-end pr-[50px] font-tinos text-[17px] font-bold mt-5">
                    <div>
                      <p>T.K.G.Dharmasiri,</p>
                      <p>Transport Manager,</p>
                      <p>Gampaha head office,</p>
                      <p>Gampaha ,</p>
                      <p>Ministry of Transport </p>
                    </div>
                  </div>
                  <div className="w-full  flex justify-center  font-tinos text-[22px] font-bold mt-7">
                    <div>
                      <p className="underline">
                        Increase buses count for a single routes immediately
                      </p>
                    </div>
                  </div>
                  <div className="w-full  flex justify-start pl-[30px] font-tinos text-[18px] font-bold mt-8">
                    <div>
                      <p>To who may it concerns,</p>
                    </div>
                  </div>
                  <div className="w-full  flex justify-start pl-[30px] font-tinos text-[16px] font-bold mt-4 text-justify pr-[50px]">
                    <div>
                      <p>
                        As the Transport Manager of the Gampaha branch, I am
                        writing to request an immediate increase in the number
                        of buses allocated to Route {"  "}
                        <span className="text-[20px]">
                          {routeId == "" ? (
                            "-----Route ID------"
                          ) : (
                            <b>{routeId}</b>
                          )}
                        </span>
                        . This route, which covers the densely populated areas
                        of{" "}
                        <span className="text-[20px]">
                          {routeId === "" || !roadRoutes ? (
                            "-----Path------"
                          ) : (
                            <b>
                              {roadRoutes.find(
                                (route) => route.routeId === routeId
                              )
                                ? ` ${
                                    roadRoutes.find(
                                      (route) => route.routeId === routeId
                                    ).start
                                  } - ${
                                    roadRoutes.find(
                                      (route) => route.routeId === routeId
                                    ).end
                                  } `
                                : "-----Path------"}
                            </b>
                          )}
                        </span>
                        , has been experiencing a {"  "}
                        <span className="text-[20px]">
                          {justification == ""
                            ? "-----justification------"
                            : justification}
                        </span>
                        {"  "}. The current situation poses a considerable
                        inconvenience to our passengers, leading to
                        dissatisfaction and potential loss of ridership. To
                        address this pressing issue and enhance the quality of
                        our service, we propose a substantial increase{" "}
                        <span className="text-[20px]">
                          {" "}
                          {busCount == "" ? "-----busCount------" : busCount}
                        </span>{" "}
                        buses dedicated to Route{" "}
                        <span className="text-[20px]">
                          {routeId == "" ? (
                            "-----Route ID------"
                          ) : (
                            <b>{routeId}</b>
                          )}
                        </span>
                        . This adjustment will not only alleviate the current
                        congestion but also significantly improve the overall
                        efficiency and reliability of our public transportation
                        system in the Gampaha region. We earnestly seek your
                        support and approval for this vital enhancement in our
                        bus service, which will undoubtedly benefit both our
                        passengers and the broader community."
                      </p>
                    </div>
                  </div>
                  <div className="signDate flex justify-between items-end px-[100px] mb-[50px] mt-[10px]">
                    <div className=" font-tinos flex flex-col items-center ">
                      <p className="font-semibold text-[15px]">
                        {dayjs().format("DD/MM/YYYY")}
                      </p>
                      <div className="h-[2px] w-[150px] bg-black" />
                      <p className="font-bold text-[20px]">Date</p>
                    </div>
                    <div className="sign flex flex-col items-center">
                      <div>
                        <img
                          src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1695917032/4152-removebg-preview_kwedsy.png"
                          alt=""
                          className="w-[150px]"
                        />
                      </div>
                      <div className="h-[2px] w-[150px] bg-black" />
                      <p className="font-tinos  font-bold  text-[20px]">
                        Signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PDFExport>
        </div>
        <div>
          <div className="flex gap-3 text-[17px] font-roboto">
            <div>
              <label className="">Route ID</label>
              <input
                type="text"
                name="routeId"
                id="routeId"
                className="w-full p-3 border-2 border-black rounded-md"
                onChange={(e) => {
                  setRouteId(e.target.value);
                }}
                value={routeId}
              />
            </div>
            <div>
              <label className="">Bus Count</label>
              <input
                type="text"
                name="productID"
                id="productID"
                className="w-full p-3 border-2 border-black rounded-md"
                onChange={(e) => {
                  setBusCount(e.target.value);
                }}
                value={busCount}
              />
            </div>
          </div>
          <div className="text-[17px] font-roboto mt-3">
            <label className="">Justification</label>
            <textarea
              type="text"
              name=""
              id=""
              cols="30"
              rows="7"
              className="w-full p-3 border-2 border-black rounded-md"
              placeholder="type here....."
              onChange={(e) => {
                setJustification(e.target.value);
              }}
              value={justification}
            ></textarea>
          </div>

          <div className="flex justify-center w-full">
            <button
              className="my-6 px-[40px] py-3 text-white rounded-md  place-items-end font-roboto"
              style={{ background: "#04062C" }}
              onClick={exportPDFWithMethod}
              //disabled={!pdfRow}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
