{
  // DOM要素の取得 & オブジェクト指向;

  class ProjectInput {
    templateElement: HTMLTemplateElement; //グローバルに利用できる型
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    constructor() {
      // const templateEl=document.getElementById("project-input");
      // if(templateEl){//要素がない可能性など考慮するならif文を書く
      //     this.templateElement=templateEl
      // }

      // getElementByIdには型の内容まで理解できないので、型キャストを行う<HTMLTemplateElement> or as HTMLTemplateElement
      this.templateElement = document.getElementById(
        "project-input"
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById("app")! as HTMLDivElement;
      console.log(this.templateElement);

      const importedNode = document.importNode(
        //const importedNode: DocumentFragment 型推論してくれている！
        this.templateElement.content,
        true
      ); //第二引数でdeep cloneできる！その下の階層まで取得可能
      this.element = importedNode.firstElementChild as HTMLFormElement; //insertAdjacentElementに渡す具体的なDOMの取得
      console.log(this.element);

      this.attach();
    }

    private attach() {
      this.hostElement.insertAdjacentElement("afterbegin", this.element);
      //  'beforebegin': targetElement 自体の前。
      // 'afterbegin': targetElement の直下、最初の子の前。
      // 'beforeend': targetElement の直下、最後の子の後。
      // 'afterend': targetElement 自体の後。
    }
  }

  const prjInput = new ProjectInput();
}
