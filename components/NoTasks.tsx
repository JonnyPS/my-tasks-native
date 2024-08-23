import { Text } from "react-native";
import type { StatusValueProps } from "./TodoListItem";
export function NoTasks({ statusValue }: StatusValueProps) {
  return <Text>There are no tasks in {statusValue}</Text>;
}
