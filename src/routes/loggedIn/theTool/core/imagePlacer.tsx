import {Component, FunctionalComponent, h} from "preact";
import * as style from "./style.css";
import {GenerationModel, TShirtColors, TShirtTypes} from "../generationModel";
import {LoadedChanelModel} from "../../../../components/utils/images.service";
import {DrawArea} from "./toolCore";
import {apiUrlPrefix} from "../../../../components/utils/global";




export interface Props {
    model: GenerationModel;
    channels: LoadedChanelModel[];
    drawArea: DrawArea
}

const ImagePlacer: FunctionalComponent<Props> = (props: Props) => {

    const randomlyChoosePic = () => {
        if (props && props.channels) {
            let channel = 1;
            if (props.channels[channel] && props.channels[channel].pictures) {
                let picture = Math.floor(Math.random() * Math.floor(props.channels[channel].pictures.length));
                return props.channels[channel].pictures[picture];
            }

        }


    }

    console.log(props);



    let chosenPic1: any = randomlyChoosePic();
    let chosenPic2: any = randomlyChoosePic();

    if (chosenPic1) {
        chosenPic1 = <image x={props.drawArea.x} y={props.drawArea.y} href={apiUrlPrefix + 'imagefiles/' + chosenPic1.filename} width="250"/>;
    }

    if (chosenPic2) {
        chosenPic2 = <image x={props.drawArea.x} y={props.drawArea.y + 250} href={apiUrlPrefix + 'imagefiles/' + chosenPic2.filename} width="250"/>;
    }


    return (
        <g>
            {chosenPic1}
            {chosenPic2}
        </g>
    );

}

export default ImagePlacer;


