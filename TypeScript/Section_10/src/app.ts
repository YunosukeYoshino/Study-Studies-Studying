/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

//トリプルスラッシュディレクトティブというTS独自の特別な指示　importできる！
//ts-configでoutfileをオンにすることで依存関係をクリアできる！ moduleもクリアしておく！

namespace App {
  new ProjectInput(); //インスタンス化
  new ProjectList("active");
  new ProjectList("finished");
}
