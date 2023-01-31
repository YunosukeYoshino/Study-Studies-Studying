namespace App {
  //Drag & Drop
  export interface Draggable {
    //exportで他のファイルでも使えるように！
    dragStartHandler(event: DragEvent): void; //voidで何も返さない
    dragEndHandler(event: DragEvent): void;
  }
  // projectListをドロップしたい
  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    drapHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void; //ビジュアル上のフィードバックを行うためのイベントハンドラー
  }
}
