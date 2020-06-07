import { Component } from 'preact';
import { useState } from 'preact/hooks';
import { css, jsx as h } from '@emotion/core';

import loop from './loop';
import { detectPitch, getNote } from './audio';
import MuteButton from './MuteButton';
import Display from './Display';

export const App = ({analyzer, media}) => {

    const [isMuted, setIsMuted] = useState(false);
    const [note, setNote] = useState('');
    const [freq, setFreq] = useState(0);

    const subscribeToPitchChange = function (analyzer) {
        const updateNote = (analyzer) => {
            const freq = detectPitch(analyzer);
            if (freq > -1) {
                const note = getNote(freq);
                setNote(note);
                setFreq(freq|0);
            } else {
                setNote('');
                setFreq(0);
            }
        };
        loop(updateNote, analyzer);
    }

    subscribeToPitchChange(analyzer);

    return <div css={css`
        border: 1px solid ${isMuted ? 'lightgray' : 'black'};
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
    `}>
        <div css={css`
            border: 3px solid ${isMuted ? 'lightgray' : 'black'};
            border-radius: 15px;
            box-sizing: border-box;
            height: 360px;
            margin: 50vh auto;
            padding: 2rem;
            transform: translateY(-50%);
            width: 480px;
        `}>
            <MuteButton media={media} parentSetIsMuted={isMuted => setIsMuted(isMuted)} />
            <Display note={note} freq={freq} isMuted={isMuted} />
        </div>
    </div>
}

export default App;

