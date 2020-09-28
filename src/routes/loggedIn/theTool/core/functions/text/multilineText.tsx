import {FunctionalComponent, h} from 'preact';
import {GenerationModel, TShirtColors, WordProps} from "../../../generationModel";
import {glob_generationModel} from "../../imagePlacer";
import {determineMultilineTextDimensions} from "./helpers";
import {getWord} from "../content";


interface Props {
    w: WordProps
}


const MultilineText: FunctionalComponent<Props> = (props: Props) => {
    const toDraw: any[] = [];





    let color = "black";
    if (glob_generationModel && glob_generationModel.tShirtColor === TShirtColors.DARK) {
        color = "white";
    }
    console.log(glob_generationModel.tShirtColor);

    props.w.lines.forEach(line => {
        toDraw.push(<tspan x={props.w.x} dy="1.2em" fill={color}>{line}</tspan>);
    })

    return (
        <g>
            {/*<rect x={props.w.x} y={props.w.y} width={props.w.width} height={props.w.height} style="stroke: red; fill-opacity: 0" />*/}
            <text x={props.w.x} y={props.w.y} font-size={props.w.fontSize} style={{fontFamily: props.w.fontFamily}}>
                {toDraw}
            </text>

        </g>
    )
}

export default MultilineText;

