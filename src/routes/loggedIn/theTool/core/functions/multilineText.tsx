import {FunctionalComponent, h} from 'preact';
import {WordProps} from "../../generationModel";
import {getTextWidth, wrapLine} from "./drawing";


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
    resultLines.forEach(line => {
        toDraw.push(<tspan x="0" dy="1.2em">{line}</tspan>);
    })

    return (
        <text x={props.w.x} y={props.w.y} font-size={props.w.fontSize} style={{fontFamily: props.w.fontFamily}}>
            {toDraw}
        </text>
    )
}

export default MultilineText;

