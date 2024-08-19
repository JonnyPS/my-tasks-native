import { FlatList, TextInput, StyleSheet, View } from "react-native";
import { Href, Link } from "expo-router";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage";
import { TodoListItem } from "@/components/TodoListItem";
import { TodoListItemProps, StatusValueProps } from "@/components/TodoListItem";

export default function HomeScreen() {
  const storageKey = "todo-list";
  const [todoList, setTodoList] = useState<TodoListItemProps[]>([]);
  const [value, setValue] = useState("");

  // on component mount, retrieve todo list from local storage
  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        setTodoList(data);
      }
    };

    fetchInitial();
  }, []);

  // handle what happens when item gets deleted from list
  const handleDelete = (id: string) => {
    console.log("handleDelete", id);

    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
    saveToStorage(storageKey, newTodoList);
  };

  // handle what happens when item gets added to list
  const handleSubmit = () => {
    const newTodoList = [
      {
        id: new Date().toISOString(),
        name: value,
        statusValue: "Not started",
      },
      ...todoList,
    ];
    setTodoList(newTodoList);
    saveToStorage(storageKey, newTodoList);
  };

  const handleChange = (id: string, value: StatusValueProps) => {
    console.log("value", value);
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        // Return a new object with the updated age
        return { ...item, statusValue: value };
      }
      // Return the original object if no change is needed
      return item;
    });

    // Update the state with the new array
    setTodoList(updatedTodoList);
    saveToStorage(storageKey, updatedTodoList);
  };

  return (
    <View style={styles.viewContainer}>
      <Link
        href={"/inProgress" as Href}
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /inProgress
      </Link>
      <FlatList
        ListHeaderComponent={
          <TextInput
            style={styles.textInput}
            value={value}
            placeholder="Add task"
            onChangeText={setValue}
            onSubmitEditing={handleSubmit}
          />
        }
        data={todoList}
        renderItem={({ item }) => (
          <TodoListItem
            name={item.name}
            id={item.id}
            statusValue={item.statusValue}
            onDelete={() => handleDelete(item.id)}
            onChange={(value) =>
              handleChange(item.id, value as unknown as StatusValueProps)
            }
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    marginBottom: 24,
  },
});
