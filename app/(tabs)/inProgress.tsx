import { FlatList, Text } from "react-native";
import { useState } from "react";
import { TodoListItem } from "@/components/TodoListItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import type { TodoListItemProps } from "@/components/TodoListItem";
import { useTodo } from "@/context/todoList";

export default function InProgress() {
  const { todoList, handleDelete, handleSubmit, handleChange } = useTodo();
  const [inProgressTodoList, setInProgressTodoList] = useState<
    TodoListItemProps[]
  >([]);
  useFocusEffect(
    useCallback(() => {
      console.log("useEffect inProgress", todoList);
      const filteredTodoList: TodoListItemProps[] = todoList.filter(
        (item: { statusValue: string }) => item.statusValue === "In progress"
      );
      setInProgressTodoList(filteredTodoList);
      console.log("filteredTodoList", filteredTodoList);
    }, [todoList])
  );

  if (inProgressTodoList!.length === 0) {
    return <Text>No tasks in 'In progress'</Text>; // Or any other component/message you want to render
  }

  return (
    <FlatList
      data={inProgressTodoList}
      renderItem={({ item }) => (
        <TodoListItem
          name={item.name}
          id={item.id}
          onDelete={() => handleDelete(item.id)}
          statusValue={item.statusValue}
        />
      )}
    ></FlatList>
  );
}
