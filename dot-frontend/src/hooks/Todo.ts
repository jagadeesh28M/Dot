import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { DATABASE_URL } from "../config";

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
}

// Hook to add a new todo
export const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTodo = async (todo: Todo) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${DATABASE_URL}/api/v1/todo`,
        { title: todo.title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Todo added successfully:", response.data);
      setLoading(false);
      return response.data;
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || error.message);
        console.error(
          "Error adding todo:",
          error.response?.data || error.message
        );
      } else {
        setError("An unknown error occurred");
        console.error("Error adding todo:", error);
      }
    }
  };

  return { addTodo, loading, error };
};

// Hook to fetch all todos
export const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<{ todos: Todo[] }>(
        `${DATABASE_URL}/api/v1/todo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data.todos);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || error.message);
        console.error("Error fetching todos:", error.message);
      } else {
        setError("An unknown error occurred");
        console.error("Error fetching todos:", error);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return { todos, fetchTodos, loading, error };
};

// Hook to delete a todo
export const useDeleteTodo = () => {
  const deleteTodo = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      await axios.delete(`${DATABASE_URL}/api/v1/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error deleting todo:", error.message);
      } else {
        console.error("Error deleting todo:", error);
      }
    }
  };

  return deleteTodo;
};

// Hook to update a todo
export const useUpdateTodo = () => {
  const updateTodo = async (id: number, newTitle: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
    try {
      await axios.put(
        `${DATABASE_URL}/api/v1/todo/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      } else {
        console.log("Error updating todo:", error);
      }
    }
  };

  return updateTodo;
};
