import React from "react";

import { Link, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
      alignItems: "stretch",
   },
   detailColumn: {
      flexDirection: "column",
      flexGrow: 9,
      textTransform: "uppercase",
   },
   linkColumn: {
      flexDirection: "column",
      flexGrow: 2,
      alignSelf: "flex-end",
      justifySelf: "flex-end",
   },
   name: {
      fontSize: 24,
      fontFamily: "Lato Bold",
   },
   subtitle: {
      fontSize: 10,
      justifySelf: "flex-end",
      fontFamily: "Lato",
   },
   link: {
      fontFamily: "Lato",
      fontSize: 10,
      color: "black",
      textDecoration: "none",
      alignSelf: "flex-end",
      justifySelf: "flex-end",
   },
});

export default function Header({ name, subTitle, currentLength, email }) {
   return (
      <View style={styles.container}>
         <View style={styles.detailColumn}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>{subTitle}</Text>
            <Text style={styles.subtitle}>
               {currentLength}year(s) work experience
            </Text>
         </View>
         <View style={styles.linkColumn}>
            <Link href="mailto:luke@theforce.com" style={styles.link}>
               {email}
            </Link>
         </View>
      </View>
   );
}
