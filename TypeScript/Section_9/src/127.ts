{
  // 再利用可能なバリデーション機能の作成
  class ProjectInput {
    templateElement: HTMLTemplateElement; //グローバルに利用できる型
    hostElement: HTMLDivElement; //#app
    element: HTMLFormElement; //importedNode.firstElementChild
    titleInputElment: HTMLInputElement; //#titleを取得
    descriptionInputElment: HTMLInputElement; //#descriptionを取得
    mandayInputElment: HTMLInputElement; //#mandayを取得

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
      this.configire(); //private configire()を実行
      this.attach(); //private attach()を実行

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
      this.element.id = "user-input";
    }

    private submitHandler(event: Event) {
      //eventのオブジェクトを受け取ります。
      event.preventDefault(); //formでhttpリクエストが送られないようにする！
      console.log(this.titleInputElment.value);
    }
    private configire() {
      // configireではイベントリスナーの設定します。
      this.element.addEventListener("submit", this.submitHandler.bind(this)); //bindを行うことによってthisの参照がconstructorになる
    }
    private attach() {
      //要素を追加します。
      this.hostElement.insertAdjacentElement("afterbegin", this.element);
      //  'beforebegin': targetElement 自体の前。
      // 'afterbegin': targetElement の直下、最初の子の前。
      // 'beforeend': targetElement の直下、最後の子の後。
      // 'afterend': targetElement 自体の後。
    }
  }

  const prjInput = new ProjectInput(); //インスタンス化
}
