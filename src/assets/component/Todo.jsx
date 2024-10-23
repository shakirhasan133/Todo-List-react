import { useEffect, useRef, useState } from "react";
import todo_icon from "../img/todo_icon.png";
import TodoList from "./TodoList";

const Todo = () => {
  const [list, setList] = useState(
    localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const handleEnterpress = (event) => {
    if (event.key === "Enter") {
      add();
    }
  };

  const handleDelete = (id) => {
    setList(list.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setList(
      list.map((todo) => {
        if (todo.id == id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(list));
  }, [list]);

  return (
    <div className="rounded-md bg-[#ffffff] w-full md:w-96 shadow-md min-h-screen md:min-h-[600px] h-auto overflow-y-auto  mx-auto">
      {/* Title Part */}
      <div className="flex p-5 gap-2 justify-center  border-b-2 border-y-cyan-700 shadow-sm">
        <img className="w-6" src={todo_icon} alt="" />
        <h1 className="font-bold text-lg">Todo List By Shakir</h1>
      </div>

      {/* Input Part */}
      <div className="flex items-center bg-gray-200 rounded-full my-3 mx-3">
        <input
          onKeyPress={handleEnterpress}
          ref={inputRef}
          className="flex-1 bg-transparent border-0 outline-none h-8 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Input your task"
        />
        <button
          onClick={add}
          className="border-none outline-none rounded-full text-white bg-orange-500 w-24 h-12 text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/* List Part */}

      <div>
        {list.map((text, i) => {
          return (
            <TodoList
              className="w-11/12 overflow-auto"
              handleDelete={handleDelete}
              toggle={toggle}
              key={i}
              text={text}
              id={text.id}
              isComplete={text.isComplete}
            ></TodoList>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
