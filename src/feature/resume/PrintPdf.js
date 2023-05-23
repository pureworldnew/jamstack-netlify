import React from "react";
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Font,
} from "@react-pdf/renderer";
// import replaceWithBr from "utils/replaceWithBr";

import Header from "./Header";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";

const styles = StyleSheet.create({
   page: {
      padding: 30,
   },
   container: {
      flex: 1,
      flexDirection: "row",
      "@media max-width: 400": {
         flexDirection: "column",
      },
   },
   image: {
      marginBottom: 10,
   },
   leftColumn: {
      flexDirection: "column",
      width: 170,
      paddingTop: 30,
      paddingRight: 15,
      "@media max-width: 400": {
         width: "100%",
         paddingRight: 0,
      },
      "@media orientation: landscape": {
         width: 200,
      },
   },
   footer: {
      fontSize: 12,
      fontFamily: "Lato Bold",
      textAlign: "center",
      marginTop: 15,
      paddingTop: 5,
      borderWidth: 3,
      borderColor: "gray",
      borderStyle: "dashed",
      "@media orientation: landscape": {
         marginTop: 10,
      },
   },
});

Font.register({
   family: "Open Sans",
   src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
   family: "Lato",
   src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
   family: "Lato Italic",
   src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
   family: "Lato Bold",
   src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});
// Create styles
function Resume(props) {
   return (
      <Page {...props} style={styles.page}>
         <Header />
         <View style={styles.container}>
            <View style={styles.leftColumn}>
               <Education />
               <Skills />
            </View>
            <Experience />
         </View>
         <Text style={styles.footer}>
            This IS the candidate you are looking for
         </Text>
      </Page>
   );
}

export default function PrintPdf(result) {
   console.log("printable result", result);
   // replaceWithBr(result.objective);
   // const result1 = {
   //    id: "8d710359-92cb-4df4-8c2b-7422749d580e",
   //    fullName: "Jonathan Samayoa",
   //    currentPosition: "With",
   //    currentLength: "10",
   //    currentTechnologies: "react, node, javascript, aws",
   //    workHistory: [
   //       {
   //          name: "sky republic inc",
   //          position: "react developer",
   //       },
   //    ],
   //    objective:
   //       "\n\nMy name is Jonathan Samayoa and I am a technology professional with 10 years of experience. My expertise lies in developing web applications using React, Node.js, JavaScript and AWS technologies. During my career, I have worked on multiple projects involving all aspects of software development life cycle from design to deployment. My strong technical skills combined with excellent communication abilities make me an asset to any team or organization looking for someone who can deliver results quickly and efficiently. With my ability to think outside the box while paying attention to details, I'm confident that any project given to me will be completed successfully and exceed expectations.",
   //    keypoints:
   //       " \n\n1. Proven track record of 10+ years in developing software applications using React, Node, JavaScript and AWS technologies. \n2. Experienced in implementing full-stack web development solutions that are scalable and secure. \n3. Expertise in designing user interfaces with intuitive navigation for maximum usability and accessibility across all devices.  \n4. Skilled at troubleshooting complex technical issues to ensure smooth operation of projects from inception to completion. \n5. Adept at managing multiple tasks simultaneously while meeting tight deadlines within budget constraints. \n6. Ability to work independently or as part of a team to effectively collaborate on project objectives and deliverables efficiently .   \n7 . Excellent communication skills with the ability to communicate clearly with stakeholders, end users, and colleagues alike for successful outcomes .  \n8 . Possess an up-to-date knowledge of industry trends and developments related to web technologies such as React, Node, JavaScript & AWS Cloud Services",
   //    jobResponsibilities:
   //       "\n\n1. At Sky Republic Inc., I worked as a React Developer for 10 years. My main responsibilities included developing user-friendly web applications and creating innovative solutions to complex problems. During my tenure, I helped improve the company’s performance by utilizing cutting-edge technologies and tools such as ReactJS, Redux, NodeJS and AWS Lambda. Additionally, I also collaborated with other developers to ensure that our products met the highest standards of quality and efficiency. \n2. Over the course of my time at Sky Republic Inc., I gained invaluable experience in software engineering principles like object-oriented programming (OOP) and design patterns such as Model View Controller (MVC). With this knowledge, I was able to create robust web applications which could scale easily with changing business requirements. Moreover, by leveraging modern frameworks like AngularJS or Vuejs; I enabled faster development cycles without compromising on code quality or security measures taken throughout the process. \n3. As part of my role at Sky Republic Inc., I was responsible for debugging existing systems while ensuring high availability across all platforms we supported - from mobile devices to desktop computers running Windows & Mac OS X operating systems respectively . Furthermore ,I also implemented various performance optimization techniques which further enhanced",
   // };
   const { fullName } = result;
   return (
      <Document
         author={`prfix ${fullName}`}
         keywords="awesome, resume, start wars"
         subject={`The resume of ${fullName}`}
         title={`${fullName} Resume`}
      >
         <Resume size="A4" {...result} />
      </Document>
   );
}
