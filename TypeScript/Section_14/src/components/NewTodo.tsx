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
    let enteredText = textInputRef.current!.value; //currentプロパティを用いてDOMにアクセスをする
    if (enteredText === "") {
      alert("TODOを入力してください");
      return;
    } //入力値がない場合早期リターン
    props.onAddTodo(enteredText);
    textInputRef.current!.value = ""; //送信後クリア
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
