import "./css/main.css";
import "./scss/style.scss";
import gsap from 'gsap';

import barba from '@barba/core';

const animationEnter = (container) => {
    return gsap.from(container, { autoAlpha: 0, duration: 2, clearProps: "all", ease: "none" })// clearProps:アニメーション終了後特定のstyleを削除する

}
const animationLeave = (container, done) => {
    // return gsap.to(container, { autoAlpha: 0, duration: 2, clearProps: "all", ease: "none", onComplete: () => done() })
    return gsap.to(container, { autoAlpha: 0, duration: 2, clearProps: "all", ease: "none" })
}

barba.init({
    transitions: [
        {
            once({ next }) {
                animationEnter(next.container)
            },
            // leave({ current }) {
            //     /**
            //      * アニメーションを再生する前に、このアニメーションが終了するのを待つ必要があります
            //      */
            //     const done = this.async();
            //     console.log("leave");
            //     animationLeave(current.container, done)
            // },
            leave: ({ current }) => animationLeave(current.container),
            enter({ next }) {
                animationEnter(next.container)
            },
        }
    ]
})
