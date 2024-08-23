import { FlatList } from "react-native";
import { useState } from "react";
import { TodoListItem } from "@/components/TodoListItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import type { TodoListItemProps } from "@/components/TodoListItem";
import { useTodo } from "@/context/todoList";
import { NoTasks } from "@/components/NoTasks";

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
    return <NoTasks statusValue={"In progress"} />;
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
