import { View, StyleSheet } from "react-native";
import { NotStarted } from "./notStarted";
import { ReactElement, JSXElementConstructor } from "react";

export default function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
      <NotStarted />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
