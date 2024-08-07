import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const Home = () => (
  <View>
    <Link style={style.button} href="/(game)/join">
      <ThemedText>Play</ThemedText>
    </Link>
    <Link style={style.button} href="/(shop)">
      <ThemedText>Shop</ThemedText>
    </Link>
  </View>
);

export default Home;

const style = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: "black",
  },
});
