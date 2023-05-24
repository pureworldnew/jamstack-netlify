/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Font,
} from "@react-pdf/renderer";
import parse from "html-react-parser";

import Header from "./Header";
import Skills from "./Skills";
import Education from "./Education";
// import Experience from "./Experience";
import WorkHistory from "./WorkHistory";

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
   columnContainer: {
      flex: 1,
      flexDirection: "column",
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
   objective: {
      fontSize: 10,
      fontFamily: "Lato",
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
   const {
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      email,
      address,
      phone,
      linkedin,
      workHistory,
      objective,
      keypoints,
      collegeName,
      collegeDegree,
      collegeMajor,
      collegePeriod,
      jobResponsibilities,
   } = props;
   return (
      <Page {...props} style={styles.page}>
         <Header
            address={address}
            phone={phone}
            linkedin={linkedin}
            name={fullName}
            subTitle={`${currentPosition} : ${currentTechnologies} : ${currentLength} year(s) work experience`}
            email={email}
            currentLength={currentLength}
         />
         <Text style={styles.objective}>{parse(objective)}</Text>
         <View style={styles.container}>
            <View style={styles.leftColumn}>
               <Education
                  collegeName={collegeName}
                  collegeDegree={collegeDegree}
                  collegeMajor={collegeMajor}
                  collegePeriod={collegePeriod}
               />
               <Skills />
            </View>
            <View style={styles.container}>
               <WorkHistory
                  workHistory={workHistory}
                  jobResponsibilities={jobResponsibilities}
                  keypoints={keypoints}
               />
            </View>
         </View>
      </Page>
   );
}

export default function PrintPdf(result) {
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
