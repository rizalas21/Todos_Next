import { Todo } from "@/types/todo";
import axios from "axios";

export const TodoService = {
  getTodos(filter: string) {
    return axios.get("/api/todos", { params: { filter } });
  },

  getTodo(id: string) {
    return axios.get(`/api/todos/${id}`);
  },

  addTodo(data: Omit<Todo, "id">) {
    return axios.post("/api/todos", data);
  },

  deleteTodo(id: string) {
    return axios.delete(`/api/todos/${id}`);
  },

  updateTodo(data: Todo) {
    console.log(data);
    return axios.put(`/api/todos/${data.id}`, data);
  },
};
