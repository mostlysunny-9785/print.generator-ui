import {apiUrlPrefix} from "../../../../components/utils/global";
import {h} from "preact";
import {DrawArea} from "./toolCore";
import {Area, ImageProps, WordProps} from "../generationModel";
import {ImagesService} from "../../../../services/images.service";
import {WordModel} from "../../../../services/words.service";


export const getRatio = (width: number, height: number): number => {
    return width/height;
}

export const getRandom = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export const computeHeight = (width: number, ratio: number): number => {
    return width / ratio;
}

export const computeWidth = (height: number, ratio: number): number => {
    return height * ratio;
}

export const pix2mm = (pixels: number, dpi: number): number => {
    return (pixels/0.0393701)/dpi;
}

export const mm2pix = (mm: number, dpi: number): number => {
    return mm * (dpi/25.4);
}


