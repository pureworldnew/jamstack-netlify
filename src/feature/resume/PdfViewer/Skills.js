/* eslint-disable react/no-array-index-key */

import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import parse from "html-react-parser";
import removeLineBreakFirstLast from "utils/removeLineBreakFirstLast";
import Title from "./Title";
import { Summary } from "./List";

const styles = StyleSheet.create({
   title: {
      fontFamily: "Lato Bold",
      fontSize: 11,
      marginBottom: 10,
   },
   skills: {
      fontFamily: "Lato",
      fontSize: 10,
      marginBottom: 10,
   },
   detailContainer: {
      flexDirection: "row",
   },
});

function SkillEntry({ name, skills }) {
   return (
      <View>
         <Text style={styles.title}>{name}</Text>
         <Summary style={styles.detailContainer}>{skills}</Summary>
      </View>
   );
}

function Skills({ skillsSection }) {
   return (
      <View>
         <Title>Skills</Title>
         <SkillEntry
            name="Combat Abilities"
            skills={parse(removeLineBreakFirstLast(skillsSection))}
         />
      </View>
   );
}

export default Skills;
