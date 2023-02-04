import React from "react";
import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string }[]; //オブジェクト型
  onDeleteTodo: (id: string) => void; //onDeleteTodoも定義する
}

// ジェネリック型で指定
const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {/* onDeleteTodoはtodo.idを引数として受け取る必要があるので、bindを使って参照させる。 */}
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
