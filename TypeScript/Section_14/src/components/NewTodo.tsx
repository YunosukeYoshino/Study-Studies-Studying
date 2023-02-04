import React, { useRef } from "react";
import "./NewTodo.css";

//ここではinterfaceでも問題ないが、typeで定義
type NewTodoProps = {
  onAddTodo: (todoText: string) => void; //onAddTodo関数の型定義
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  //Ref要素を用いてDOMにアクセスが可能になる。
  const textInputRef = useRef<HTMLInputElement>(null); //初期値はnull

  const todoSubmitHandler = (event: React.FormEvent) => {
    //submitしたときにしか呼ばれれない //form用の型定義

    event.preventDefault();
    const enteredText = textInputRef.current!.value; //currentプロパティを用いてDOMにアクセスをする
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">ToDo内容</label>
        <input type="text" id="input-text" ref={textInputRef} />
      </div>
      <button type="submit">TODO追加</button>
    </form>
  );
};

export default NewTodo;
