import Component from "./base-component.js";
import * as Validatable from "../util/validation.js"; // グループ化 エイリアス(別名をつけることができる！)
import { autobind as Autobind } from "../decorators/autoBind.js"; //名前をつけることによって似たような名前を避けるメリットがある。
import { projectState } from "../state/project-state.js";

//ProjectInput Class
// DOM要素の取得 & オブジェクト指向;
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElment: HTMLInputElement; //#titleを取得
  descriptionInputElment: HTMLInputElement; //#descriptionを取得
  mandayInputElment: HTMLInputElement; //#mandayを取得

  constructor() {
    super("project-input", "app", true, "user-input");

    // フォームの３つの入力項目を取得する！
    this.titleInputElment = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElment = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mandayInputElment = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;
    this.configure();
  }
  public configure() {
    // configireではイベントリスナーの設定します。
    this.element.addEventListener("submit", this.submitHandler); //bindを行うことによってthisの参照がconstructorになる
  }
  renderContent() {}
  private gatherUserInput(): [string, string, number] | void {
    //何も返さないvoid
    //[string,string,number]でタップルを返す。
    const enteredTitle = this.titleInputElment.value; //formのタイトルを取得する。
    const enteredDescription = this.descriptionInputElment.value; //descriptionを取得する。
    const enteredMonday = this.mandayInputElment.value; //mondayを取得する。

    const titleValidatable: Validatable.Validatable = {
      //value
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable.Validatable = {
      //value
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable.Validatable = {
      //value
      value: +enteredMonday, //Mondayはnumberに変換
      required: true,
      min: 1,
      max: 1000,
    };
    if (
      // enteredTitle.trim().length === 0 || //空白ではないかをチェック
      // enteredDescription.trim().length === 0 || //空白ではないかをチェック
      // enteredMonday.trim().length === 0 //空白ではないかをチェック
      !Validatable.validate(titleValidatable) || //requiredは必須、minLengthは最小文字
      !Validatable.validate(descriptionValidatable) || //requiredは必須、minLengthは最小文字
      !Validatable.validate(mandayValidatable) //requiredは必須、minLengthは最小文字
    ) {
      alert("入力値が正しくありません！再度お試してください");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredMonday]; //+でnumber型に変換
    }
  }

  private clearInputs() {
    this.titleInputElment.value = ""; //formのタイトルを取得する。
    this.descriptionInputElment.value = ""; //descriptionを取得する。
    this.mandayInputElment.value = ""; //mondayを取得する。
  }
  @Autobind
  private submitHandler(event: Event) {
    //eventのオブジェクトを受け取ります。
    event.preventDefault(); //formでhttpリクエストが送られないようにする！
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      // javascriptでtupleかどうかを判定するには配列かどうか

      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday); //これでプロジェクトを追加できるようになりました。
      this.clearInputs();
    }
  }
}
