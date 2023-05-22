/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   PDFDownloadLink,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";

// Create styles
const styles = StyleSheet.create({
   page: {
      backgroundColor: "#d11fb6",
      color: "white",
   },
   section: {
      margin: 10,
      padding: 10,
   },
   viewer: {
      width: window.innerWidth, // the pdf viewer will take up all of the width and height
      height: window.innerHeight,
   },
});

export default function ResumePrint() {
   const result = useSelector((state) => state.resume.resumeData);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);
   console.log("resumeData", result);
   // 👇🏻 function that replaces the new line with a break tag
   // const replaceWithBr = (string) => string.replace(/\n/g, "<br />");

   // 👇🏻 returns an error page if the result object is empty
   if (JSON.stringify(result) === "{}") {
      return <ErrorPage />;
   }

   if (resumeLoading) {
      return <div>...loading</div>;
   }
   return (
      <>
         {/* <Button onClick={handlePrintPdf}>Print Page</Button> */}
         {/* Start of the document */}

         <PDFDownloadLink
            document={
               <Document>
                  {/* render a single page */}
                  <Page size="A4" style={styles.page}>
                     <View style={styles.section}>
                        <Text>{result.fullName}</Text>
                     </View>
                     <View style={styles.section}>
                        <Text>
                           {result.currentPosition} (
                           {result.currentTechnologies})
                        </Text>
                     </View>
                  </Page>
               </Document>
            }
            fileName="movielist.pdf"
            style={{
               textDecoration: "none",
               padding: "10px",
               color: "#4a4a4a",
               backgroundColor: "#f2f2f2",
               border: "1px solid #4a4a4a",
            }}
         >
            {({ loading }) =>
               loading ? "Loading document..." : "Download Pdf"
            }
         </PDFDownloadLink>
         {/* <main className="container" ref={componentRef}>
            <header className="header">
               <div>
                  <h1>{result.fullName}</h1>
                  <p className="resumeTitle headerTitle">
                     {result.currentPosition} ({result.currentTechnologies})
                  </p>
                  <p className="resumeTitle">
                     {result.currentLength}year(s) work experience
                  </p>
               </div>
               <div>
                   <img
                     src={result.image_url}
                     alt={result.fullName}
                     className="resumeImage"
                  /> 
               </div>
            </header>
            <div className="resumeBody">
               <div>
                  <h2 className="resumeBodyTitle">PROFILE SUMMARY</h2>
                  <p
                     dangerouslySetInnerHTML={{
                        __html: replaceWithBr(result.objective),
                     }}
                     className="resumeBodyContent"
                  />
               </div>
               <div>
                  <h2 className="resumeBodyTitle">WORK HISTORY</h2>
                  {result.workHistory.map((work) => (
                     <p className="resumeBodyContent" key={work.name}>
                        <span style={{ fontWeight: "bold" }}>{work.name}</span>{" "}
                        - {work.position}
                     </p>
                  ))}
               </div>
               <div>
                  <h2 className="resumeBodyTitle">JOB PROFILE</h2>
                  <p
                     dangerouslySetInnerHTML={{
                        __html: replaceWithBr(result.jobResponsibilities),
                     }}
                     className="resumeBodyContent"
                  />
               </div>
               <div>
                  <h2 className="resumeBodyTitle">JOB RESPONSIBILITIES</h2>
                  <p
                     dangerouslySetInnerHTML={{
                        __html: replaceWithBr(result.keypoints),
                     }}
                     className="resumeBodyContent"
                  />
               </div>
            </div>
         </main> */}
      </>
   );
}
