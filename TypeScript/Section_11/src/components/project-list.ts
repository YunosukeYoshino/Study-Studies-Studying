import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { ProjectItme } from "./project-item";
import Component from "./base-component";
import { autobind } from "../decorators/autoBind";
import { DragTarget } from "../models/drag-drop";

//projectList Class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  // templateElement: HTMLTemplateElement; //グローバルに利用できる型
  // hostElement: HTMLDivElement; //#app
  // element: HTMLElement; //importedNode.firstElementChild
  assignedProjects: Project[]; //リストに割り当てられた配列 //このclass専用のプロパティなので残しておく

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = []; //初期化
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable"); //ドロップする際にスタイルを変える
    }
  }

  @autobind
  drapHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable"); //ドロップする際にスタイルを変える
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.drapHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relavantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active; //avtiveと同じだったらtrueを返す。
        }
        return prj.status === ProjectStatus.Finished; //それ以外のものはFinishedのものを取得する。
      }); //この関数が実行されると新しい配列に格納されます。

      this.assignedProjects = relavantProjects; //assignedProjectsに受け取ったprojectを渡します。
      this.renderProjects(); //リスナー関数でrender関数を呼ぶ
    });
  }

  public renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId; //listidを追加する！
    this.element.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト"; //listidを追加する！
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = ""; //同じリストが複数入るのを防ぐために、Listをクリアする。
    for (const prjItem of this.assignedProjects) {
      new ProjectItme(listEl.id, prjItem); //インスタンス化
    }
  }
}
