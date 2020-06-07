import { Component } from 'preact';
import { useSelector } from 'fleux';
import { css, jsx as h } from '@emotion/core';

import { getOctaveFromPitch } from './audio';

export const Display = ({note, freq, isMuted}) => {

    var noteName = '';
    var noteModifier = '';
    var octave = getOctaveFromPitch(freq);

    if (note.length === 0) {
        noteName = '-';
    } else if (note.length === 2) {
        noteName = note.substr(0, 1);
        noteModifier = note.substr(1, 1);
    } else {
        noteName = note;
    }

    return <div css={css`
    `}>
        <span css={css`
            color: ${isMuted ? 'lightgray': 'black'};
            display: block;
            text-align: center;
        `}>{freq || '-'}Hz</span>
        <span css={css`
            color: ${isMuted ? 'lightgray': 'black'};
            display: block;
            display: block;
            font-size: 48px;
            text-align: center;
        `}>{noteName}<sup>{noteModifier}</sup> <span>{octave || ''}</span>
        </span>
    </div>
}

export default Display
