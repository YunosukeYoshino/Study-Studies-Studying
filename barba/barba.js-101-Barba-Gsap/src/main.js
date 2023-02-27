import "./css/main.css";
import "./scss/style.scss";
import gsap from 'gsap';
import { animationEnter, animationLeave, leaveToProject, revealProject, leaveFromProject } from "./js";
import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import barbaRouter from '@barba/router';

//barbaRouter を定義
const myRoutes = [
    { path: '/index.html', name: 'home' },
    { path: '/detail-page.html', name: 'detail-page' },
    { path: '/detail-page2.html', name: 'detail-page2' },
    { path: '/architecture.html', name: 'architecture' },
];


//barbaPrefetch barbaRouter を使用する
barba.use(barbaRouter, {
    routes: myRoutes
});
barba.use(barbaPrefetch);

const resetActiveLink = () => gsap.set("a.is-active span", {
    xPercent: -100,
    transformOrigin: "left"
})

barba.hooks.enter((data) => {
    console.log({ data });
    window.scrollTo(0, 0); //ページ遷移後の scroll位置を修正
})

barba.hooks.after(() => {
    console.log("after");
})

barba.init({
    views: [
        {
            namespace: "architecture",
            // 現在の 名前空間から離れる前に何かをする
            beforeLeave({ current }) {
                console.log(current.container);

            },
            //  名前空間に入る前に何かをする
            beforeEnter({ current }) {
                console.log(current.container);
            },

        }
    ],
    transitions: [
        {
            name: 'detail-page',
            to: {
                namespace: ["detail-page"]
            },
            once({ next }) {
                revealProject(next.container)
            },
            leave: ({ current }) => leaveToProject(current.container),
            enter({ next }) {
                revealProject(next.container)
            },
        },
        {
            name: "general-transition",
            once({ next }) {
                resetActiveLink()
                gsap.from("header a", {
                    duration: 0.6,
                    yPercent: 100,
                    stagger: 0.2,
                    ease: "power1.out",
                    onComplete: () => animationEnter(next.container)
                })
                // animationEnter(next.container)
            },
            leave: ({ current }) => animationLeave(current.container),
            enter({ next }) {
                animationEnter(next.container)
            },
        },
        {
            name: 'from-detail',
            from: {
                namespace: ["detail-page"]
            },
            leave: ({ current }) => leaveFromProject(current.container),
            enter({ next }) {
                gsap.from("header a", {
                    duration: 0.6,
                    yPercent: 100,
                    stagger: 0.2,
                    ease: "power1.out",
                }),
                    animationEnter(next.container)
            }
        },
    ]
})
