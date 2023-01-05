const child = document.querySelector(".child1");
const cb = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            //入った時
            console.log("inView");
            entry.target.classList.add("inView");
            // observer.unobserve(entry.target)//一回のみ監視
        } else {
            //でた時
            console.log("outView");
            entry.target.classList.remove("inView");
        }
    });
};

const options = {
    root: null,//あまりいじらない
    rootMargin: "-300px 0px -300px 0px",//デフォルトは0px
    //必ずpxをつける
    threshold: 0//1だと交差するまでは正になる
};

const io = new IntersectionObserver(cb, options);//newで初期化処理
io.observe(child);//監視の対象 入った時と外れた時に呼ばれる
