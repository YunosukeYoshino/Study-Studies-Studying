let instance = new Promise((
    resolve,
    reject //new Promiseのコールバック関数内で非同期処理を行う
) => {
    setTimeout(() => {
        // 0から10までのランダムな数値
        const rand = Math.floor(Math.random() * 11);
        if (rand > 5) {
            resolve(rand); //５未満エラーになる
        } else {
            reject(rand);//それ以外が成功
        }
    }, 1000);
});

instance = instance.then(value => {
    console.log(`5以上値[${value}]が返ってきました`);
});

instance = instance.catch(errorValue => {
    console.error(`5未満[${errorValue}]が渡ってきたためエラーを表示`);
});

instance = instance.finally(() => {
    console.log('処理を終了します。');
});
