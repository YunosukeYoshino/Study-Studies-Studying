//Component Class
/*component classは継承されて使われるべきなので、abstractとつける
これによりインスタンス化ができなくなる。
*/
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
