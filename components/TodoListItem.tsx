import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useState } from "react";
export type TodoListItemProps = {
  name: string;
  id: string;
  statusValue?: "Not started" | "In progress" | "Completed";
  onChange?: (value: string) => void;
  onDelete?: () => void;
};

export type StatusValueProps = Pick<TodoListItemProps, "statusValue">;

export function TodoListItem({
  name,
  id,
  onChange,
  onDelete,
  statusValue,
}: TodoListItemProps) {
  const [selectedValue, setSelectedValue] = useState();

  const handlePress = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete?.(),
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{name}</Text>
      <Text
        style={
          statusValue === "Not started"
            ? styles.itemStatusValueTextNotStarted
            : statusValue === "In progress"
            ? styles.itemStatusValueTextInProgress
            : styles.itemStatusValueTextCompleted
        }
      >
        {statusValue ? statusValue : "Not started"}
      </Text>

      <Pressable onPress={handlePress} style={styles.itemButton}>
        <Text style={styles.itemButtonText}>Delete</Text>
      </Pressable>
      <Picker
        style={styles.itemPicker}
        selectedValue={statusValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          onChange!(itemValue as unknown as string);
        }}
      >
        <Picker.Item label="Not started" value="Not started" />
        <Picker.Item label="In progress" value="In progress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    padding: 5,
    backgroundColor: "#eaeaea",
    marginBottom: 4,
    alignItems: "center",
  },
  itemName: {
    fontSize: 18,
  },
  itemStatusValueTextNotStarted: {
    backgroundColor: "lightgreen",
  },
  itemStatusValueTextInProgress: {
    backgroundColor: "lightblue",
  },
  itemStatusValueTextCompleted: {
    backgroundColor: "yellow",
  },
  itemPicker: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1,
  },
  itemButton: {
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  itemButtonText: {
    color: "white",
  },
});
function onDelete() {
  throw new Error("Function not implemented.");
}
