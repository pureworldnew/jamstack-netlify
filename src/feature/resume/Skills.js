/* eslint-disable react/no-array-index-key */

import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

import Title from "./Title";
import List, { Item } from "./List";

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
});

function SkillEntry({ name, skills }) {
   return (
      <View>
         <Text style={styles.title}>{name}</Text>
         <List>
            {skills.map((skill, i) => (
               <Item key={i}>{skill}</Item>
            ))}
         </List>
      </View>
   );
}

function Skills() {
   return (
      <View>
         <Title>Skills</Title>
         <SkillEntry
            name="Combat Abilities"
            skills={[
               "Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire",
               "Defeated the Rancor and rescued Princess Leia from Jabba the Hutt",
               "Competent fighter pilot as well as an excelent shot with nearly any weapon",
            ]}
         />
      </View>
   );
}

export default Skills;
