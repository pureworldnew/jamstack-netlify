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
      id: "6d833dae-b64f-4b43-8973-01aadb3d1bda",
      fullName: "James Larro",
      currentPosition: "special",
      currentLength: "10",
      currentTechnologies: "react, node, javascript, ES6",
      email: "jonathandreamdev@gmail.com",
      address: "Amarillo, TX",
      phone: "+1 806 576 1063",
      linkedin: "https://www.linkedin.com/in/jonathan-samayoa/",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegeName: "University of Texas at Dallas, Richardson, TX",
      workHistory: [
         {
            name: "sky republic inc",
            position: "software developer",
         },
      ],
      objective:
         "\n\nI am an experienced special with 10 years of experience in the technology industry. I specialize in React, Node.js, JavaScript, and ES6 development. My expertise lies in developing efficient solutions that are tailored to meet customer requirements while maintaining a high level of quality and reliability. I have worked on projects for both large corporations as well as small startups, giving me a broad range of experiences to draw from when creating new systems or updating existing ones. With my knowledge of the latest technologies, I can quickly understand complex problems and develop innovative solutions that satisfy customer needs while staying within budget constraints.",
      keypoints:
         "\n\n1. Proven ability to develop and deploy React, Node, JavaScript and ES6 applications in a professional environment for 10 years. \n2. Experienced in creating user-friendly interfaces with modern web technologies that meet the highest standards of quality and performance. \n3. Skilled at troubleshooting complex issues quickly to ensure minimal downtime on projects. \n4. Adept at working collaboratively with other developers to design efficient solutions for challenging tasks or problems. \n5. Proficient in utilizing version control systems such as Git and SVN to manage code changes across multiple environments efficiently and effectively  \n6. Ability to stay up-to-date with the latest trends and best practices in web development technology through self learning initiatives and attending conferences/workshops regularly  \n7 .Excellent communication skills enabling effective collaboration within teams while leading successful implementation of projects from start to finish \n8 .Highly organized individual capable of managing multiple tasks simultaneously while adhering strictly to deadlines",
      jobResponsibilities:
         "\n\n1. I began my career at Sky Republic Inc as a software developer 10 years ago and have grown in the role ever since. During this time, I acquired an extensive knowledge of both front-end and back-end development technologies, such as JavaScript, HTML5 and CSS3. Additionally, I developed valuable problem solving skills to quickly debug complex issues while ensuring exceptional customer service. \n2. Over the course of my tenure with Sky Republic Inc., I increased efficiency by streamlining processes and automating manual tasks using scripting languages like Python and Bash shell scripts. My achievements also include designing innovative solutions for challenging problems that resulted in improved user experience across multiple platforms including desktop, mobile web and native applications on iOS & Android devices. \n3. In addition to improving operational performance, I was responsible for maintaining high standards of quality assurance throughout product lifecycles which included writing unit tests to ensure reliability before releasing products into production environments. Furthermore, I collaborated closely with other teams within the organization to enhance cross-functional collaboration between departments resulting in better outcomes overall.",
   };
   // 👇🏻 returns an error page if the result object is empty
   if (JSON.stringify(result) === "{}") {
      return <ErrorPage />;
   }

   if (resumeLoading) {
      return <div>...loading</div>;
   }
   return (
      <Box>
         <PDFDownloadLink
            document={<PrintPdf {...result} />}
            fileName={`${result.fullName} resume.pdf`}
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
         {/* Start of the document */}
         <PDFViewer width="100%" height={window.innerHeight}>
            <PrintPdf {...result} />
         </PDFViewer>
      </Box>
   );
}
