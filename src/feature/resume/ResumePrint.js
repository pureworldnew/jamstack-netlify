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
      email: "jonathandreamdev@gmail.com",
      phone: "+1-806-576-1063",
      address: "Amarillo, TX",
      linkedin: "linkedin.com/in/jonathan-samayoa/",
      currentPosition: "With-meetwithanyone.com",
      currentLength: "5",
      currentTechnologies: "React, Node, Javascript, AWS",
      collegeName: "University of Texas at Dallas, Richardson, TX",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2010-2014",
      fullName: "Jonathan Samayoa",
      workHistory: [
         {
            name: "sky",
            position: "react developer",
            fromWhenTo: "05.2018 ~ 05.2023",
         },
      ],
      id: "7100aaa4-b191-4cc8-adb8-1698f2042c6c",
      objective:
         "\n\nMy name is Jonathan Samayoa and I am an experienced software engineer with 5 years of experience in developing web applications using React, Node, JavaScript and AWS technologies. In my role at With-meetwithanyone.com I have been responsible for building new features from the ground up as well as maintaining existing codebase to ensure high performance standards are met. My knowledge of cutting edge technologies has enabled me to create innovative solutions that add value to our products while also providing a great user experience. I take pride in my work and strive for excellence in all areas related to software development.",
      keypoints:
         "\n\n1. Expert in developing web applications using React, Node, JavaScript and AWS technologies. \n2. Experienced in creating efficient and maintainable code with a focus on scalability and performance optimization. \n3. Demonstrated ability to develop creative solutions to complex problems while adhering to best practices of software engineering principles. \n4. Extensive knowledge of modern web development tools such as Git/GitHub for version control, npm for package management, etc.. \n5. Skilled at debugging issues quickly and efficiently by leveraging advanced troubleshooting techniques .  \n6. Proven track record of producing high-quality work within tight deadlines while maintaining excellent customer satisfaction ratings .  \n7. 5+ years experience working professionally with-meetwithanyone website platform delivering successful projects under demanding time constraints .   \n8. Self-motivated team player who can effectively collaborate with colleagues from diverse backgrounds to achieve common goals",
      jobResponsibilities:
         "\n\n1. At With-meetwithanyone.com, I worked for 5 years as a React Developer. During that time, I was able to develop and maintain several web applications by using the latest technologies in JavaScript and HTML/CSS coding. Additionally, I provided technical support to customers while troubleshooting their issues with the software. My experience at this company enabled me to grow both technically and professionally which helped me become an efficient problem solver and leader within any team environment. \n2. Working at Sky gave me the opportunity to work on a wide range of projects such as developing mobile applications for iOS & Android platforms, creating websites from scratch utilizing modern front end frameworks like ReactJS & VueJS as well as building backend services using NodeJS & ExpressJS among other technologies . My role also involved being part of cross functional teams responsible for developing new features or fixing bugs in existing products while ensuring that they were delivered on time with high quality standards . By working here , I have gained invaluable knowledge about product development life cycle which has allowed me to take ownership over my own tasks and be proactive when it comes to finding solutions for complex problems .",
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
