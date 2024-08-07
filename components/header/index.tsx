import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

// type options =
//   | NativeStackNavigationOptions
//   | ((prop: {
//       route: RouteProp<ParamListBase, string>;
//       navigation: any;
//     }) => NativeStackNavigationOptions)
//   | undefined;

const Header = (props: any) => {
  return (
    <View style={style.titleContainer}>
      <ThemedText type="title">{props.title}</ThemedText>
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  titleContainer: {
    justifyContent: "flex-start",
    display: "flex",
    width: "100%",
  },
});
