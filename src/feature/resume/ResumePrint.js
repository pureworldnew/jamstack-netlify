/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import PrintPdf from "./PrintPdf";
import ErrorPage from "./ErrorPage";

export default function ResumePrint() {
   // const result = useSelector((state) => state.resume.resumeData);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);
   // console.log("resumeData", result);
   const result = {
      id: "8d710359-92cb-4df4-8c2b-7422749d580e",
      fullName: "Jonathan Samayoa",
      currentPosition: "With",
      currentLength: "10",
      currentTechnologies: "react, node, javascript, aws",
      workHistory: [
         {
            name: "sky republic inc",
            position: "react developer",
         },
      ],
      objective:
         "\n\nMy name is Jonathan Samayoa and I am a technology professional with 10 years of experience. My expertise lies in developing web applications using React, Node.js, JavaScript and AWS technologies. During my career, I have worked on multiple projects involving all aspects of software development life cycle from design to deployment. My strong technical skills combined with excellent communication abilities make me an asset to any team or organization looking for someone who can deliver results quickly and efficiently. With my ability to think outside the box while paying attention to details, I'm confident that any project given to me will be completed successfully and exceed expectations.",
      keypoints:
         " \n\n1. Proven track record of 10+ years in developing software applications using React, Node, JavaScript and AWS technologies. \n2. Experienced in implementing full-stack web development solutions that are scalable and secure. \n3. Expertise in designing user interfaces with intuitive navigation for maximum usability and accessibility across all devices.  \n4. Skilled at troubleshooting complex technical issues to ensure smooth operation of projects from inception to completion. \n5. Adept at managing multiple tasks simultaneously while meeting tight deadlines within budget constraints. \n6. Ability to work independently or as part of a team to effectively collaborate on project objectives and deliverables efficiently .   \n7 . Excellent communication skills with the ability to communicate clearly with stakeholders, end users, and colleagues alike for successful outcomes .  \n8 . Possess an up-to-date knowledge of industry trends and developments related to web technologies such as React, Node, JavaScript & AWS Cloud Services",
      jobResponsibilities:
         "\n\n1. At Sky Republic Inc., I worked as a React Developer for 10 years. My main responsibilities included developing user-friendly web applications and creating innovative solutions to complex problems. During my tenure, I helped improve the company’s performance by utilizing cutting-edge technologies and tools such as ReactJS, Redux, NodeJS and AWS Lambda. Additionally, I also collaborated with other developers to ensure that our products met the highest standards of quality and efficiency. \n2. Over the course of my time at Sky Republic Inc., I gained invaluable experience in software engineering principles like object-oriented programming (OOP) and design patterns such as Model View Controller (MVC). With this knowledge, I was able to create robust web applications which could scale easily with changing business requirements. Moreover, by leveraging modern frameworks like AngularJS or Vuejs; I enabled faster development cycles without compromising on code quality or security measures taken throughout the process. \n3. As part of my role at Sky Republic Inc., I was responsible for debugging existing systems while ensuring high availability across all platforms we supported - from mobile devices to desktop computers running Windows & Mac OS X operating systems respectively . Furthermore ,I also implemented various performance optimization techniques which further enhanced",
   };
   // 👇🏻 function that replaces the new line with a break tag

   // 👇🏻 returns an error page if the result object is empty
   if (JSON.stringify(result) === "{}") {
      return <ErrorPage />;
   }

   if (resumeLoading) {
      return <div>...loading</div>;
   }
   return (
      <Box>
         {/* <Button onClick={handlePrintPdf}>Print Page</Button> */}
         {/* Start of the document */}
         <PDFViewer width="100%" height={window.innerHeight}>
            <PrintPdf {...result} />
         </PDFViewer>

         <PDFDownloadLink
            document={<PrintPdf {...result} />}
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
      </Box>
   );
}
