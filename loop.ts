export const loop = function (fn, ...args) {
    const tmp = () => {
        fn(...args);
        window.requestAnimationFrame(tmp);
    }
    tmp();
}

export default loop
