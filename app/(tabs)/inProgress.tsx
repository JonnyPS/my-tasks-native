import { FlatList } from "react-native";
import { useState } from "react";
import { getFromStorage } from "@/utils/storage";
import { TodoListItem } from "@/components/TodoListItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import type { TodoListItemProps } from "@/components/TodoListItem";

export default function InProgress() {
  const storageKey = "todo-list";
  const [todoList, setTodoList] = useState<TodoListItemProps[]>([]);

  // when tab comes into focus , retrieve todo list from local storage
  useFocusEffect(
    useCallback(() => {
      console.log("inProgress useEffect");
      const fetchInitial = async () => {
        const data = await getFromStorage(storageKey);
        console.log("data", data);
        if (data) {
          // setTodoList(data);
          const inProgressTodoList = data.filter(
            (item: { statusValue: string }) =>
              item.statusValue === "In progress"
          );
          console.log("inProgressTodoList", inProgressTodoList);
          setTodoList(inProgressTodoList);
        }
      };

      fetchInitial();
      // Optional: If you need to clean up when the screen loses focus
      return () => {
        // Clean up if necessary
      };
    }, [])
  );
  return (
    <FlatList
      data={todoList}
      renderItem={({ item }) => (
        <TodoListItem
          name={item.name}
          id={item.id}
          statusValue={item.statusValue}
        />
      )}
    ></FlatList>
  );
  // return <Text>Welcome to the inProgress list</Text>;
}
