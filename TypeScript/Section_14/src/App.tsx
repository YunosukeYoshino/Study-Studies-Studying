import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model"; //外部からinterfaceを定義

// function コンポーネント
// function App() {
//   return <div className="App"></div>;
// }

// React.FCはReact@typesから提供されている。
const App: React.FC = () => {
  // todosは配列で、setTodosは関数です。
  const [todos, setTodos] = useState<Todo[]>([]); //空の配列であるとTSで推論されてしまう。

  //NewTodoからAPPコンポーネントに入力したテキストを渡したい。
  const todoAddHandler = (text: string) => {
    console.log(todos);
    // // レストパラメーターで配列を新しく更新しても問題ないけど;
    // setTodos([...todos, { id: Math.random().toString(), text: text }]);

    setTodos((prevTodos) => [
      ...prevTodos, //既存のTodo
      { id: Math.random().toString(), text: text }, //新しいtodoが入った配列で更新できる。
    ]);
  };

  const todoDeleteHandler = (todoID: string) => {
    // todo.id !== todoIDが同じ場合削除したいので、反転する！
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoID));
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
