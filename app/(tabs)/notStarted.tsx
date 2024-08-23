import { FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { TodoListItem } from "@/components/TodoListItem";
import type {
  StatusValueProps,
  TodoListItemProps,
} from "@/components/TodoListItem";
import { useTodo } from "@/context/todoList";

export function NotStarted() {
  const { todoList, handleDelete, handleChange } = useTodo();
  const [notStartedTodoList, setNotStartedTodoList] = useState<
    TodoListItemProps[]
  >([]);

  useEffect(() => {
    const filteredTodoList = todoList.filter(
      (item) =>
        item.statusValue === "Not started" ||
        item.statusValue === "In progress" ||
        item.statusValue === "Completed"
    );
    setNotStartedTodoList(filteredTodoList);
  }, [todoList]);

  if (notStartedTodoList.length === 0) {
    return <Text>No tasks in 'Not started'</Text>; // Or any other component/message you want to render
  }

  return (
    <FlatList
      data={notStartedTodoList}
      renderItem={({ item }) => (
        <TodoListItem
          name={item.name}
          id={item.id}
          statusValue={item.statusValue}
          onDelete={() => handleDelete(item.id)}
          onChange={() =>
            handleChange(item.id, item.statusValue as StatusValueProps)
          }
        />
      )}
    />
  );
}
