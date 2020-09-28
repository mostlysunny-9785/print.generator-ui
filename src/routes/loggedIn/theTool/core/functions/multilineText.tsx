import {FunctionalComponent, h} from 'preact';
import {GenerationModel, TShirtColors, WordProps} from "../../generationModel";
import {getTextWidth, wrapLine} from "./drawing";
import {glob_generationModel} from "../imagePlacer";


interface Props {
    w: WordProps
}

const MultilineText: FunctionalComponent<Props> = (props: Props) => {
    const fontStr = props.w.fontSize + " " + props.w.fontFamily;
    const lines = props.w.text.split('\n');
    let resultLines: any[] = [];

    // for each line determine if longer than height and if is create new line and put things under that
    lines.forEach((line: string) => {
        const wrappedLine = [line];
        wrapLine(wrappedLine, 0, props.w.width, fontStr);
        resultLines = resultLines.concat(wrappedLine);

    })

    const toDraw: any[] = [];

    let color = "black";
    if (glob_generationModel && glob_generationModel.tShirtColor === TShirtColors.DARK) {
        color = "white";
    }
    console.log(glob_generationModel.tShirtColor);

    resultLines.forEach(line => {
        toDraw.push(<tspan x={props.w.x} dy="1.2em" fill={color}>{line}</tspan>);
    })

    return (
        <text x={props.w.x} y={props.w.y} font-size={props.w.fontSize} style={{fontFamily: props.w.fontFamily}}>
            {toDraw}
        </text>
    )
}

export default MultilineText;

