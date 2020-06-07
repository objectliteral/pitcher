import { Component } from 'preact';
import { useState } from 'preact/hooks';
import { css, jsx as h } from '@emotion/core';

const toggleMute = media => media.getAudioTracks()[0].enabled = !media.getAudioTracks()[0].enabled;

export const MuteButton = ({media, parentSetIsMuted}) => {

    const [isMuted, setIsMuted] = useState(false);

    const click = () => {
        toggleMute(media);
        setIsMuted(!isMuted);
        parentSetIsMuted(!isMuted);
    };

    return <input type="button" onClick={click} value={isMuted ? `Unmute` : `Mute`} css={css`
        background: white;
        border: 3px solid black;
        border-radius: 6px;
        font: inherit;
        padding: 0.2em;
        width: 6em;
    `}/>
}

export default MuteButton
