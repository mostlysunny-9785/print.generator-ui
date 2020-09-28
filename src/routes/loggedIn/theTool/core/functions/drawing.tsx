import {Area, ImageProps, TShirtColors, WordProps} from "../../generationModel";
import {apiUrlPrefix} from "../../../../../components/utils/global";
import {h} from "preact";
import MultilineText from "./multilineText";
import {glob_generationModel} from "../imagePlacer";

export const drawObj = (obj: Area) => {
    if ((obj as ImageProps).path) {
        const i = obj as ImageProps;
        return <image x={i.x} y={i.y} href={apiUrlPrefix + 'imagefiles/' + i.path} width={i.width} height={i.height} />;
    } else if ((obj as WordProps).text) {
        const t = obj as WordProps;
        // return <text x={t.x} y={t.y} style={{
        //     fontFamily: t.fontFamily,
        //     fontSize: t.fontSize
        // }}>{t.text}</text>;

        // getTextWidth("Hello thereee", "12px arial");



        return  <MultilineText w={t} />

    } else {
        return ;
    }

}

const canvas = document.createElement("canvas");

export const getTextWidth = (text: string, font: string): number => {
    var context: any = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

if (!Array.prototype.hasOwnProperty("last")) {
    Object.defineProperty(Array.prototype, "last", {
        get() {
            return this[this.length - 1];
        }
    });
}

/*** this is serious shit :D Just made word wrapping by myself?!
 *  measure active line
    is text bigger?
  yes - remove last word and put it to start of next line
  no - move to next line
  am i on the end of lines? - completed return lines
 * @param lines
 * @param actualLineNum
 * @param maxWidth
 * @param font
 */
export const wrapLine = (lines: string[], actualLineNum: number, maxWidth: number, font: string): void => {
    const textWidth = getTextWidth(lines[actualLineNum], font);
    const wordsOfLine = lines[actualLineNum].split(' ');
    // @ts-ignore
    const lastWord = wordsOfLine.last;
    const weCanWrap = wordsOfLine.length !== 1;

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

        return wrapLine(lines, actualLineNum, maxWidth, font);
    } else {
        // check if next line exists
        if (lines.length - 1 === actualLineNum + 1) {
            return wrapLine(lines, actualLineNum + 1, maxWidth, font); // move to next line
        } else { // there is no new line and actual one is already at the end
            return;
        }
    }




}
const lines = ['first second third paty sesty sedmy osmy devaty desaty jedenacty, dvanacty'];
wrapLine(lines, 0, 150, '20px Arial');

console.log(lines);
