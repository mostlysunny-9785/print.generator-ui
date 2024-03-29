import {Area, WordProps} from "../../../generationModel";
import {DrawArea} from "../../toolCore";

const canvas = document.createElement("canvas");



export const determineMultilineTextDimensions = (word: WordProps, areaToFit: DrawArea): void => {

    let resultLines: any[] = [];
    word.smallerFontRecommended = false; // reset recommendations
    word.lines = word.text.split('\n'); // just to be sure that we are really starting with blank lines
    // for each line determine if longer than height and if is create new line and put things under that
    word.lines.forEach((line: string) => {
        const wrappedLine = [line];
        wrapLine(wrappedLine, 0, word.width, word);
        resultLines = resultLines.concat(wrappedLine);
    })

    word.lines = resultLines;
    word.height = word.lines.length * 1.0 * word.fontSize;

    // check if we are not over width
    if (word.smallerFontRecommended) {
        // first try to determine for how much it should be smaller to save time
        // TODO: try to minimize this...
        const lowerByOne = word.fontSize - 1;
        if (word.proposedFontSize && lowerByOne > word.proposedFontSize) {
            word.fontSize = word.proposedFontSize;
        } else {
            word.fontSize = lowerByOne;
        }
        // console.log(lowerByOne + " " + word.proposedFontSize);
        // lets try it again
        determineMultilineTextDimensions(word, areaToFit); // try it again
    }
}



export const getMultilineLines = (word: WordProps): string[] => {
    return [];
}


export const getTextWidth = (text: string, font: string): number => {
    var context: any = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}



/*** This is serious shit :D Just made SVG word wrapping... ?!
 *  measure active line
 is text bigger?
 yes - remove last word and put it to start of next line
 no - move to next line
 am i on the end of lines? - completed return lines
 * @param lines
 * @param actualLineNum
 * @param maxWidth
 * @param wordInfo
 */
export const wrapLine = (lines: string[], actualLineNum: number, maxWidth: number, wordInfo: WordProps): void => {
    const font = wordInfo.fontSize + "px " + wordInfo.fontFamily;
    const textWidth = getTextWidth(lines[actualLineNum], font); // determine actual line width in DOM
    const wordsOfLine = lines[actualLineNum].split(' ');
    // @ts-ignore
    const lastWord = wordsOfLine.last;
    const weCanWrap = wordsOfLine.length !== 1; // check if we have another words

    if (textWidth > maxWidth && !weCanWrap) { // last word in line but still bigger, we should make text smaller
        wordInfo.smallerFontRecommended = true;
        wordInfo.proposedFontSize = Math.floor(wordInfo.fontSize * (maxWidth / textWidth));
    }

    if (textWidth > maxWidth && weCanWrap) {
        // we gonna remove last word
        wordsOfLine.splice(wordsOfLine.length - 1, 1); // delete last word
        lines[actualLineNum] = wordsOfLine.join(' '); // then join it again
        if (lines.length - 1 === actualLineNum + 1) { // does next line exists?
            lines[actualLineNum + 1] = lastWord + ' ' + lines[actualLineNum + 1];
        } else { // nope - create it and push word there
            lines.push(lastWord);
        }
        // check this line again

        return wrapLine(lines, actualLineNum, maxWidth, wordInfo);
    } else {
        // check if next line exists
        if (lines.length - 1 === actualLineNum + 1) {
            return wrapLine(lines, actualLineNum + 1, maxWidth, wordInfo); // move to next line
        } else { // there is no new line and actual one is already at the end
            return;
        }
    }
}


export const guessFontSize = (word: WordProps, areaToFit: DrawArea) => {
    const aimForLinesCount = Math.ceil(areaToFit.height / word.fontSize);
    const totalWidth = getTextWidth(word.text, word.fontSize + "px " + word.fontFamily);
    const totalHeight = word.text.split('\n').length * word.fontSize;
}

