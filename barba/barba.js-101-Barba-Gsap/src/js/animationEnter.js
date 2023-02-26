import gsap from 'gsap';

const animationEnter = (container) => {
    return gsap.from(container, { autoAlpha: 0, duration: 0.7, clearProps: "all", ease: "none" })// clearProps:アニメーション終了後特定のstyleを削除する
}

export default animationEnter
