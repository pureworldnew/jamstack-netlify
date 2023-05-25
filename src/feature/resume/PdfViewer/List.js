import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
   item: {
      flexDirection: "row",
      marginBottom: 5,
   },
   bulletPoint: {
      width: 10,
      fontSize: 10,
   },
   itemContent: {
      flex: 1,
      fontSize: 10,
      fontFamily: "Lato",
   },
});

const List = ({ children }) => children;

export function Item({ children }) {
   return (
      <View style={styles.item}>
         <Text style={styles.bulletPoint}>•</Text>
         <Text style={styles.itemContent}>{children}</Text>
      </View>
   );
}

export function Summary({ children }) {
   return (
      <View style={styles.item}>
         <Text style={styles.itemContent}>{children}</Text>
      </View>
   );
}

export default List;
