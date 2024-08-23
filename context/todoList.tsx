import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage";
import { TodoListItemProps, StatusValueProps } from "@/components/TodoListItem";
import { Alert, ToastAndroid } from "react-native";

interface TodoContextType {
  todoList: TodoListItemProps[];
  handleDelete: (id: string) => void;
  handleSubmit: (name: string) => void;
  handleChange: (id: string, value: StatusValueProps) => void;
}

const defaultTodoContext: TodoContextType = {
  todoList: [],
  handleDelete: () => {},
  handleSubmit: () => {},
  handleChange: () => {},
};

export const TodoContext = createContext<TodoContextType>(defaultTodoContext);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoList, setTodoList] = useState<TodoListItemProps[]>([]);

  useEffect(() => {
    console.log("getData");
    const fetchInitial = async () => {
      const data = await getFromStorage("todo-list");
      if (data) {
        setTodoList(data);
      }
    };
    fetchInitial();
  }, []);

  const handleDelete = (id: string) => {
    console.log("handleDelete");
    ToastAndroid.show("Task has now been deleted", ToastAndroid.SHORT);
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
    saveToStorage("todo-list", newTodoList);
  };

  const handleSubmit = (name: string) => {
    console.log("handleSubmit");
    const newTodoList = [
      {
        id: new Date().toISOString(),
        name,
        statusValue: "Not started",
      },
      ...todoList,
    ];
    setTodoList(newTodoList as TodoListItemProps[]);
    saveToStorage("todo-list", newTodoList);
  };

  const handleChange = (id: string, value: StatusValueProps) => {
    console.log("handleChange", id + " " + value);
    ToastAndroid.show(
      `Task has now been moved to the '${value}' tab`,
      ToastAndroid.SHORT
    );

    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, statusValue: value };
      }
      return item;
    });

    console.log("updatedTodoList", updatedTodoList);
    setTodoList(updatedTodoList as TodoListItemProps[]);
    saveToStorage("todo-list", updatedTodoList);
  };

  return (
    <TodoContext.Provider
      value={{ todoList, handleDelete, handleSubmit, handleChange }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
