// handle what happens when item gets deleted from list
export const handleDelete = (id: string) => {
  console.log("handleDelete", id);

  const newTodoList = todoList.filter((item) => item.id !== id);
  setTodoList(newTodoList);
};
