import { useState } from "react";
import { useTodo } from "@/context/todoList";
import { StyleSheet, TextInput } from "react-native";

export function TodoInput() {
  const { handleSubmit } = useTodo();
  const [value, setValue] = useState("");

  return (
    <TextInput
      style={styles.textInput}
      value={value}
      placeholder="Add task"
      onChangeText={setValue}
      onSubmitEditing={() => handleSubmit(value)}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    marginBottom: 24,
  },
});
