import { h, Component, render } from 'preact';

import App from './App';

const getUserMedia = async function () {
    try {
        return await navigator.mediaDevices.getUserMedia({audio:true, video:false});
    } catch (e) {
        console.error(e)
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const media = await getUserMedia();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(audioContext);
    console.log(media)
    const mediaStreamSource = audioContext.createMediaStreamSource(media);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 2048;
    mediaStreamSource.connect(analyzer);
    console.log(analyzer);
    console.log(mediaStreamSource);
    render(<App analyzer={analyzer} media={media} />, document.getElementById('root'));
})
