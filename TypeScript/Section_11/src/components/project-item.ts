import { Draggable } from "../models/drag-drop"; //中括弧を書いて fromを指定 拡張子はjs
import { Project } from "../models/project";
import Component from "./base-component";
import { autobind } from "../decorators/autoBind";

//projectItem Class
export class ProjectItme
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  //インターフェースがあることによってどのようなメソッドを書けばいいかがわかりやすい
  private project: Project;
  //追加されるHTMLの型

  //なんらかのデータを変更するときにgetter関数は便利！
  get Manday() {
    if (this.project.manday < 20) {
      return this.project.manday.toString() + "人日";
    } else {
      return (this.project.manday / 20).toString() + "人月"; //20で割って人月を出す！
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id); //dataTransferはドロップイベントに特別に用意されたプロパティ　データを転送できる！
    //状態管理のプロパティからidを取得できる！
    event.dataTransfer!.effectAllowed = "move"; //AからBへ移動するということをブラウザに伝える
  }
  dragEndHandler(_: DragEvent) {
    console.log("ドラッグ終了");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    //this.element <li> 以下の要素を取得
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.Manday;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
