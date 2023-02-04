const path = require('path')//requireはnode.jsでモジュールをインストールする構文
//node.jsの構文
module.exports = {
    mode: "development",//開発環境
    entry: "./src/app.ts",//エントリーポイント
    output: {
        filename: "bundle.js",//[contenthash]でハッシュ値をつけることができる！
        path: path.resolve(__dirname, "dist"),//絶対パスである必要がある。
        publicPath: "/dist",//サーバーのルートからの相対パス
    },
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, "dist"),
                publicPath: "/dist",
            },
            {
                directory: __dirname,
                publicPath: "/",
            },
        ],
    },
    devtool: "eval",//ソースマップは既にts-configで生成されるのでそれと繋ぎ合わせる。
    module: {
        rules: [
            {
                test: /\.ts$/, //.tsで終わる正規表現
                use: "ts-loader",//ts-loaderを使用
                exclude: /node_modules/,//node_modulesを除外
            }
        ]//配列にすることで様々なルールを適用することができる。
    },
    resolve: {
        extensions: [".ts", ".js"]//これらのファイルを探します。
    }
}
