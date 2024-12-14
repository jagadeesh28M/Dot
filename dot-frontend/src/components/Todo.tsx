import { useState } from "react";
import cross from "../assets/cross-removebg-preview.png";
import { useDeleteTodo, useUpdateTodo } from "../hooks/Todo";

interface TodoCheck {
  todo: string;
  id: number;
  fetchTodos: () => void;
}

export const Todo = ({ todo, id, fetchTodos }: TodoCheck) => {
  const [status, setStatus] = useState<boolean>(false);
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const dTodo = async () => {
    await deleteTodo(id);
    fetchTodos(); // Re-fetch todos from the parent component
  };
  const uTodo = async () => {
    await updateTodo(id);
    setStatus((prev) => !prev);
  };

  return (
    <div className="w-auto h-12 bg-[#edf2f6] mt-4 flex items-center rounded-lg">
      <input onClick={uTodo} type="checkbox" className="size-5 mx-5" />
      <div className="flex justify-between items-center w-full">
        {status ? (
          <p className="text-xl font-semibold line-through">{todo}</p>
        ) : (
          <p className="text-xl font-semibold">{todo}</p>
        )}
        <img
          onClick={dTodo}
          src={cross}
          className="hover:cursor-pointer mr-5"
        />
      </div>
    </div>
  );
};
