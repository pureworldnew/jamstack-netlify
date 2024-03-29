import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

import Title from "./Title";

const styles = StyleSheet.create({
   container: {
      marginBottom: 10,
   },
   school: {
      fontFamily: "Lato Bold",
      fontSize: 10,
   },
   degree: {
      fontFamily: "Lato",
      fontSize: 10,
   },
   candidate: {
      fontFamily: "Lato Italic",
      fontSize: 10,
   },
});

export default function Education({
   collegeName,
   collegeDegree,
   collegeMajor,
   collegePeriod,
}) {
   return (
      <View style={styles.container}>
         <Title>Education</Title>
         <Text style={styles.school}>{collegeName}</Text>
         <Text style={styles.degree}>{collegeDegree}</Text>
         <Text style={styles.degree}>{collegeMajor}</Text>
         <Text style={styles.candidate}>{collegePeriod}</Text>
      </View>
   );
}
