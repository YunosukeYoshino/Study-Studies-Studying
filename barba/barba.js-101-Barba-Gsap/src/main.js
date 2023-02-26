import "./css/main.css";
import "./scss/style.scss";
import { animationEnter, animationLeave } from "./js";
import barba from '@barba/core';



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
