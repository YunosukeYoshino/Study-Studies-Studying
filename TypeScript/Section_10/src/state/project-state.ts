namespace App {
  //Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = []; //リスナーの配列をプロパティとして追加します。
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }
  //Project State Management 状態を管理するClass
  export class ProjectState extends State<Project> {
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
  export const projectState = ProjectState.getInstance(); //getInstanceから取得している。グローバルステートはファイルのどこからでもアクセスできる！
}
