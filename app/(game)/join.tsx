import { Link } from "expo-router";
import { View, Text } from "react-native";

const Join = () => {
  return (
    <View>
      <Text>Join</Text>
      <Link href={"/channel/1"}>Join Channel</Link>
    </View>
  );
};

export default Join;
