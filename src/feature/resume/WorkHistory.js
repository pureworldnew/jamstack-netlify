/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */

import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import parse from "html-react-parser";
import removeLineBreakFirstLast from "utils/removeLineBreakFirstLast";

import Title from "./Title";
import { Summary } from "./List";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 30,
      paddingLeft: 15,
      "@media max-width: 400": {
         paddingTop: 10,
         paddingLeft: 0,
      },
   },
   detailContainer: {
      flexDirection: "row",
   },
   detailLeftColumn: {
      flexDirection: "column",
      marginLeft: 10,
      marginRight: 10,
   },
   detailRightColumn: {
      flexDirection: "column",
      flexGrow: 9,
   },
   bulletPoint: {
      fontSize: 10,
   },
   details: {
      fontSize: 10,
      fontFamily: "Lato",
   },
   headerContainer: {
      flexDirection: "row",
      marginBottom: 10,
   },
   leftColumn: {
      flexDirection: "column",
      flexGrow: 9,
   },
   rightColumn: {
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "flex-end",
      justifySelf: "flex-end",
   },
   title: {
      fontSize: 11,
      color: "black",
      textDecoration: "none",
      fontFamily: "Lato Bold",
   },
});

function WorkHistory({ workHistory, jobResponsibilities, keypoints }) {
   return (
      <View style={styles.container}>
         <Title>Work History</Title>
         {workHistory.map((work, index) => (
            <View style={styles.headerContainer} key={index}>
               <View style={styles.leftColumn}>
                  <Text style={styles.title}>
                     {work.name} - {work.position}
                  </Text>
               </View>
            </View>
         ))}
         <Title>JOB PROFILE</Title>
         <Summary style={styles.detailContainer}>
            {parse(removeLineBreakFirstLast(jobResponsibilities))}
         </Summary>
         <Title>JOB RESPONSIBILITIES</Title>
         <Summary style={styles.detailContainer}>
            {parse(removeLineBreakFirstLast(keypoints))}
         </Summary>
      </View>
   );
}

export default WorkHistory;
