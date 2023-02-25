import "./css/main.css";
import "./scss/style.scss";

import barba from '@barba/core';
import barbaCss from '@barba/css';

const body = document.querySelector("body")
barba.hooks.before((data) => {
  const background = data.current.container.dataset.background
  console.log(background);
  body.style.setProperty("--page-background", background)
})

// tell Barba to use the css plugin
barba.use(barbaCss);

// init Barba
barba.init({
  transitions: [
    {
      name: 'home',
      sync: true,
      beforeOnce() {
      },
      once() {
      },
      afterOnce() {
      },
      leave() { },
      entry() { },
    },
    {
      name: "fade",
      to: {
        namespace: ["fade"]
      },
      leave() { },
      entry() { },
    },
    {
      name: "clip",
      sync: true,//syncにするこによって遷移時に入れ替え先のDOMが生成される
      to: {
        namespace: ["clip"]
      },
      leave() { },
      entry() { },
      beforeEnter() {
      }
    },
    {
      name: "with-cover",

      to: {
        namespace: ["with-cover"]
      },
      leave() {

      },
      entry() {

      },
    },
  ]
});
