import {FunctionalComponent, h} from 'preact';
import {GenerationModel, TShirtColors, WordProps} from "../../../generationModel";
import {glob_generationModel} from "../../imagePlacer";
import {determineMultilineTextDimensions} from "./helpers";
import {getWord} from "../content";
import {store} from "../../../../../../model/store";


interface Props {
    w: WordProps
}


const MultilineText: FunctionalComponent<Props> = (props: Props) => {
    const toDraw: any[] = [];

    let color = "black";
    if (store.getState().generationReducer.tShirtColor === TShirtColors.DARK) {
        color = "white";
    }


    props.w.lines.forEach(line => {
        toDraw.push(<tspan x={props.w.x} dy="1.0em">{line}</tspan>);
    })

    const style = "fill: " + color + ";" +
        "font-size: " + props.w.fontSize + "px;" +
        "font-family: " + props.w.fontFamily + ";";

    return (
        <g>
            {/*<rect x={props.w.x} y={props.w.y} width={props.w.width} height={props.w.height} style="stroke: red; fill-opacity: 0" />*/}
            <text x={props.w.x} y={props.w.y} style={style}>
                {toDraw}
            </text>

        </g>
    )
}

export default MultilineText;

