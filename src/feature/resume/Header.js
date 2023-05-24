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
      alignSelf: "center",
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
   subHeaderContainer: {
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
   },
   descContainer: {
      flexDirection: "row",
      textTransform: "none",
      justifyContent: "space-between",
   },
   descContainer1: {
      flexDirection: "row",
      textTransform: "none",
      justifyContent: "space-evenly",
   },
   descHeader: {
      fontSize: 10,
      fontFamily: "Lato",
      padding: "5px",
      textDecoration: "none",
      color: "black",
   },
});

export default function Header({
   name,
   address,
   phone,
   linkedin,
   subTitle,
   email,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.detailColumn}>
            <View style={styles.subHeaderContainer}>
               <Text style={styles.name}>{`${name}`}</Text>
               <View style={styles.descContainer1}>
                  <Text style={styles.subtitle}>{`${subTitle}`}</Text>
               </View>
            </View>
            <View style={styles.descContainer}>
               <Text style={styles.descHeader}>{address}</Text>
               <Text style={styles.descHeader}>{phone}</Text>
               <Text style={styles.descHeader}>{linkedin}</Text>
               <Link href="mailto:luke@theforce.com" style={styles.descHeader}>
                  {email}
               </Link>
            </View>
         </View>
      </View>
   );
}
