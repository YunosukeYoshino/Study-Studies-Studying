//Drag and drop
// projectListをドロップしたい

interface Draggable {
  dragStartHandler(event: DragEvent): void; //voidで何も返さない
  dragEndHandler(event: DragEvent): void;
}
// projectListをドロップしたい
interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  drapHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void; //ビジュアル上のフィードバックを行うためのイベントハンドラー
}

// Project Type
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  //インスタンスを作成したいのでclassで作成 自動補完でプロパティ名が出てくれるので保守性が高い
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus //enum型を参照
  ) {}
}

//Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = []; //リスナーの配列をプロパティとして追加します。
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
//Project State Management 状態を管理するClass
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState; //静的メソッド 変化しないメソッドやプロパティを持たせたい場合

  private constructor() {
    super();
  }
  static getInstance() {
    //instanceの存在をチェックする！
    if (this.instance) {
      return this.instance; //instanceがあればこのinstanceを返す。
    }
    this.instance = new ProjectState(); //インスタンスがなければ新しいインスタンスを作成する。
    return this.instance; //新しいinstanceを返す。
  }

  addProject(title: string, description: string, manday: number) {
    //プロジェクトのオブジェクトを定義します。
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      ProjectStatus.Active //デフォルトでactive
    );
    this.projects.push(newProject); //状態完了クラスが持っている配列に追加する。
    this.updateListeners();
  }
  moveProject(projectId: string, newStatus: ProjectStatus) {
    /*どちらの箱に移すかということを検証*/
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      //nullになる可能性があるのでif文でチェックする！
      project.status = newStatus;
      this.updateListeners();
    }
  }
  //これですべてのListener関数を呼び出せる
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      //配列に格納されているすべてのlistener関数を呼び出す！
      listenerFn(this.projects.slice()); //関数として呼び出せる。オリジナルの関数ではなくコピーの配列を作成
    }
  }
}
const projectState = ProjectState.getInstance(); //getInstanceから取得している。グローバルステートはファイルのどこからでもアクセスできる！

//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
//オブジェクトの型を定義

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0; //文字が空ではないことを判定
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength; //value値のlengthが最小値以上であるかどうか
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength; //value値のlengthが最大値以下であるかどうか
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min; //value値のlengthがmin以上であるかどうか
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max; //value値のlengthがmax値以下であるかどうか
  }
  return isValid;
}

//autobind decorator
// メソッドのデコレーターとして作成
function autobind(
  _: any, //construcor関数かclassのプロトタイプ  引数として使用するのみなので _をつける
  _2: string, //プロパティネーム,   引数として使用するのみ
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value; //submit handlerを取得している！

  const adjDescriptor: PropertyDescriptor = {
    configurable: true, //プロパティを変更できるように
    get() {
      //オリジナルのメソッドにアクセス
      const boudFn = originalMethod.bind(this); //オリジナルのbindを呼び出す
      return boudFn;
    },
  };

  return adjDescriptor;
}
//Component Class
/*component classは継承されて使われるべきなので、abstractとつける
これによりインスタンス化ができなくなる。
*/
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement; //グローバルに利用できる型
  hostElement: T; //#app
  element: U; //importedNode.firstElementChild

  constructor(
    templateId: string,
    hostElement: string,
    insertAtStart: boolean,
    newElementId?: string //任意の引数は最後に
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElement)! as T; // ジェネリック型で型キャスト

    const importedNode = document.importNode(
      //const importedNode: DocumentFragment 型推論してくれている！
      this.templateElement.content,
      true
    ); //第二引数でdeep cloneできる！その下の階層まで取得可能
    this.element = importedNode.firstElementChild as U; //insertAdjacentElementに渡す具体的なDOMの取得 ジェネリック型で型キャスト
    if (newElementId) {
      this.element.id = newElementId; //active-projectかfinished-projectになる
    }
    this.attach(insertAtStart);
  }

  abstract configure(): void;
  abstract renderContent(): void;

  private attach(insertAtBiggining: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBiggining ? "afterbegin" : "beforeend", //要素をどこに追加するか決める
      this.element
    );
  }
}
//projectItem Class
class ProjectItme
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
//projectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
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
//ProjectInput Class
// DOM要素の取得 & オブジェクト指向;
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

    const titleValidatable: Validatable = {
      //value
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      //value
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable = {
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
      !validate(titleValidatable) || //requiredは必須、minLengthは最小文字
      !validate(descriptionValidatable) || //requiredは必須、minLengthは最小文字
      !validate(mandayValidatable) //requiredは必須、minLengthは最小文字
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
  @autobind
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

const prjInput = new ProjectInput(); //インスタンス化
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
