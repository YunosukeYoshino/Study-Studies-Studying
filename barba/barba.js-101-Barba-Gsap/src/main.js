import "./css/main.css";
import "./scss/style.scss";
import gsap from 'gsap';
import { animationEnter, animationLeave, leaveToProject, revealProject, leaveFromProject } from "./js";
import barba from '@barba/core';

const resetActiveLink = () => gsap.set("a.is-active span", {
    xPercent: -100,
    transformOrigin: "left"
})

barba.init({
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
