export const autoCorrelate = function (buffer, sampleRate) {
    // auto correlation taken from Chris Wilson (https://github.com/cwilso/PitchDetect)
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE/2);
    var bestOffset = -1;
    var bestCorrelation = 0;
    var rms = 0;
    var foundGoodCorrelation = false;
    var correlations = new Array(MAX_SAMPLES);
    const threshold = 0.9;
    var lastCorrelation;

    for (let i = 0; i < SIZE; i++) {
        const value = buffer[i];
        rms += value*value;
    }

    rms = Math.sqrt(rms/SIZE);

    if (rms < 0.01) {
        return -1;
    }

    lastCorrelation = 1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;

        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += Math.abs(buffer[i]-buffer[i+offset]);
        }

        correlation = 1 - (correlation / MAX_SAMPLES);

        correlations[offset] = correlation;

        if (correlation > threshold && correlation > lastCorrelation) {
            foundGoodCorrelation = true;
            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        } else if (foundGoodCorrelation) {
            const shift = (correlations[bestOffset+1] - correlations[bestOffset-1])/correlations[bestOffset];
            return sampleRate/(bestOffset+8*shift);
        }
        lastCorrelation = correlation;
    }

    if (bestCorrelation > 0.01) {
        return sampleRate/bestOffset;
    }

    return -1;
}

export enum NoteModifier {
    Flat = '♭',
    Neutral = '♮',
    Sharp = '♯'
}

export const getOctaveFromPitch = function (f) {
    if (!f) return 0;
    const baseline = (Math.log(f/440)+4)/Math.log(2);
    const a = Math.floor(baseline);
    const deviation = 100 * (baseline - a);
    var correction = 0;
    if (deviation > 20) {
        correction = 1;
    }
    return a + correction;
}

export const noteStrings = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

export const getNoteIndex = function (f) {
    return Math.round(12 * (Math.log(f / 440)/Math.log(2))) + 49;
}

export const getNote = function (f) {
    return noteStrings[(getNoteIndex(f)+8)%12]
}

export const detectPitch = function (analyzer) {
    const buffer = new Float32Array(2048);
    analyzer.getFloatTimeDomainData(buffer);
    const freq = autoCorrelate(buffer, 44100);
    return freq;
}

