namespace App {
  // Project Type
  export enum ProjectStatus {
    Active,
    Finished,
  }
  export class Project {
    //インスタンスを作成したいのでclassで作成 自動補完でプロパティ名が出てくれるので保守性が高い
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public manday: number,
      public status: ProjectStatus //enum型を参照
    ) {}
  }
}
