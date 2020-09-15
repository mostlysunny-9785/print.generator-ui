import { Component, h } from "preact";
import * as style from "./style.css";
import { GenerationModel, TShirtColors, TShirtTypes } from "../generationModel";
import {ImageModel, LoadedChanelModel} from "../../../../services/images.service";
import ImagePlacer from "./imagePlacer";
import {WordModel} from "../../../../services/words.service";

export interface DrawArea {
    x: number;
    y: number;
    height: number;
    width: number;
    ratio: number;
}

interface State {
    drawArea: DrawArea;
}

export interface ToolCoreProps {
    model: GenerationModel;
    images: ImageModel[];
    words: WordModel[];
}

export default class TheToolCore extends Component<ToolCoreProps, State> {
    constructor(props: ToolCoreProps) {
        super(props);
        // this.state = {drawArea: {} as DrawArea};
        this.recalculateDrawArea();
    }

    componentDidUpdate(previousProps: Readonly<ToolCoreProps>) {
        if (
            previousProps.model.canvasWidth !== this.props.model.canvasWidth ||
            previousProps.model.canvasHeight !== this.props.model.canvasHeight
        ) {
            // check if props updated
            this.recalculateDrawArea();
        }
    }

    recalculateDrawArea() {
        const ratio =
            this.props.model.canvasWidth / this.props.model.canvasHeight;

        const maxW = 325;
        const maxH = 450;

        const w = 320;
        const he = ratio * 320;

        if (w > maxW) {
            console.log("Width overflow");
        }

        if (he > maxH) {
            console.log("Height overflow");
        }

        this.setState({
            drawArea: {
                x: 440,
                y: 150,
                height: he,
                width: w,
                ratio
            }
        });
    }

    getDrawArea() {
        if (this.state.drawArea.ratio && this.props.model.drawAreaVisible) {
            const style: any = {
                fill: "white",
                stroke: "black",
                strokeWidth: "2px",
                strokeDasharray: "3px"
            };
            if (this.props.model.tShirtColor === TShirtColors.DARK) {
                style.fill = "black";
                style.stroke = "white";
            }

            return (
                <rect
                    x={this.state.drawArea.x}
                    y={this.state.drawArea.y}
                    width={this.state.drawArea.width}
                    height={this.state.drawArea.height}
                    style={style}
                />
            );
        }
    }

    getLotNumbers() {
        if (this.props.model.lotNumbers) {
            return (
                <g>
                    <text
                        textAnchor="start"
                        x="595"
                        y="140"
                        class={style.lotText}
                    >
                        2
                    </text>
                    <text
                        textAnchor="start"
                        x="420"
                        y="270"
                        class={style.lotText}
                    >
                        4
                    </text>
                    <text
                        textAnchor="start"
                        x="775"
                        y="270"
                        class={style.lotText}
                    >
                        6
                    </text>
                    <text
                        textAnchor="start"
                        x="595"
                        y="600"
                        class={style.lotText}
                    >
                        0
                    </text>
                </g>
            );
        }
    }

    getTShirtFile() {
        let tShirtFile = "assets/shirt";
        switch (this.props.model.tShirtType) {
            case TShirtTypes.LONGSLEEVE:
                break;
            case TShirtTypes.TSHIRT:
                tShirtFile += "_short";
                break;
        }

        switch (this.props.model.tShirtColor) {
            case TShirtColors.DARK:
                tShirtFile += "_dark";
                break;
            case TShirtColors.LIGHT:
                break;
        }
        tShirtFile += ".svg";
        return tShirtFile;
    }

    render() {
        return (
            <div class={style.container}>
                <svg width="1200" height="1000">
                    <image
                        x={0}
                        y={0}
                        href={this.getTShirtFile()}
                        height="700"
                        width="1200"
                    />
                    {this.getDrawArea()}
                    {this.getLotNumbers()}
                    <text x="20" y="20" style={{ fontSize: "20px" }}>
                        Ratio: {this.state.drawArea.ratio}
                    </text>
                    <ImagePlacer
                        model={this.props.model}
                        words={this.props.words}
                        images={this.props.images}
                        drawArea={this.state.drawArea}
                    />
                </svg>
            </div>
        );
    }
}
