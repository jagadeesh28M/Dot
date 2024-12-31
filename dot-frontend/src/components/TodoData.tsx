import { useState } from "react";
import { useGetTodos } from "../hooks/Todo";
import { useAddTodo } from "../hooks/Todo";
import { Todo } from "./Todo";

export const TodoData = () => {
  const [todo, setTodo] = useState({ title: "" });
  const { todos, fetchTodos } = useGetTodos(); // Fetch todos and get the refetch function
  const { addTodo, loading, error } = useAddTodo();

  const handleAddTodo = async () => {
    if (!todo.title.trim()) return; // Prevent adding empty todos

    const addedTodo = await addTodo(todo);
    if (addedTodo) {
      setTodo({ title: "" });
      fetchTodos(); // Trigger a refetch of todos after adding a new one
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl p-10">
      <div className="flex-col items-center">
        <div className="relative flex items-center">
          <input
            onChange={(e) => {
              setTodo({ title: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleAddTodo();
              }
            }}
            value={todo.title}
            type="text"
            placeholder="What is your next task..."
            className="font-medium rounded-lg w-full border-2 border-[#D1D5DB] p-3 pr-16"
          />
          <button
            onClick={handleAddTodo}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-evenly gap-2 mr-3 p-3 h-9 w-auto rounded-lg text-white font-roboto hover:ease-in-out duration-200 bg-[#FF6363] hover:bg-[#504ea3]"
            disabled={loading}
          >
            <div className="text-medium">{loading ? "Adding..." : "Add"}</div>
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo.title}
                id={todo.id}
                fetchTodos={fetchTodos}
              />
            ))
          ) : (
            <p className="flex justify-center items-center text-2xl mt-5">
              No todos available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
