import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { TodoListItem } from "@/components/TodoListItem";
import type {
  StatusValueProps,
  TodoListItemProps,
} from "@/components/TodoListItem";
import { useTodo } from "@/context/todoList";
import { NoTasks } from "@/components/NoTasks";

export function NotStarted() {
  const { todoList, handleDelete, handleChange } = useTodo();
  const [notStartedTodoList, setNotStartedTodoList] = useState<
    TodoListItemProps[]
  >([]);

  useEffect(() => {
    const filteredTodoList = todoList.filter(
      (item) => item.statusValue === "Not started"
    );
    setNotStartedTodoList(filteredTodoList);
  }, [todoList]);

  if (notStartedTodoList.length === 0) {
    return <NoTasks statusValue={"Not started"} />;
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
