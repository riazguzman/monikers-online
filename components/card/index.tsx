import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

type CardProps = {
  title: String;
  description: String;
};

const Card = (props: CardProps) => {
  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <ThemedText type="title">{props.title}</ThemedText>
      </View>
      <View style={style.descriptionContainer}>
        <ThemedText type="default">{props.description}</ThemedText>
      </View>
    </View>
  );
};

export default Card;

const style = StyleSheet.create({
  titleContainer: {
    borderColor: "black",
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",

    display: "flex",

    width: "100%",
    padding: 5,
  },
  descriptionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    height: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
});
