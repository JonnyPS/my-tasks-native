import { FlatList } from "react-native";
import { useState } from "react";
import { TodoListItem } from "@/components/TodoListItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import type {
  TodoListItemProps,
  StatusValueProps,
} from "@/components/TodoListItem";

import { useTodo } from "@/context/todoList";
import { NoTasks } from "@/components/NoTasks";

export default function InProgress() {
  const { todoList, handleDelete, handleChange } = useTodo();
  const [completedTodoList, setCompletedTodoList] = useState<
    TodoListItemProps[]
  >([]);
  useFocusEffect(
    useCallback(() => {
      console.log("useEffect inProgress", todoList);
      const filteredTodoList: TodoListItemProps[] = todoList.filter(
        (item: { statusValue: string }) => item.statusValue === "Completed"
      );
      setCompletedTodoList(filteredTodoList);
      console.log("filteredTodoList", filteredTodoList);
    }, [todoList])
  );

  if (completedTodoList!.length === 0) {
    return <NoTasks statusValue={"Completed"} />;
  }

  return (
    <FlatList
      data={completedTodoList}
      renderItem={({ item }) => (
        <TodoListItem
          name={item.name}
          id={item.id}
          onDelete={() => handleDelete(item.id)}
          onChange={() =>
            handleChange(item.id, item.statusValue as StatusValueProps)
          }
          statusValue={item.statusValue}
        />
      )}
    ></FlatList>
  );
}
