import axios from "axios";
import { useState, useEffect } from "react";
import { DATABASE_URL } from "../config";

interface Todo {
  title: string;
}

export const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to add a new todo
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
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data || error.message);
      console.error(
        "Error adding todo:",
        error.response?.data || error.message
      );
    }
  };

  return { addTodo, loading, error }; // Return the addTodo function and its state
};

interface Todo {
  id: number;
  title: string;
}

interface Todo {
  id: number;
  title: string;
}

export const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const response = await axios.get(`${DATABASE_URL}/api/v1/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data.todos);
    } catch (error: any) {
      console.error("Error fetching todos:", error.message);
    }
  };

  // Fetch todos initially when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return { todos, fetchTodos }; // Return todos and the fetch function
};

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
    } catch (error: any) {
      console.error("Error deleting todo:", error.message);
    }
  };

  return deleteTodo;
};

export const useUpdateTodo = () => {
  const updateTodo = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
    try {
      await axios.put(
        `${DATABASE_URL}/api/v1/todo/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return updateTodo;
};
