// does image overlaps with different image?
import {Area, ImageProps, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {computeHeight, computeWidth, getRatio} from "../helpers";
import {apiUrlPrefix} from "../../../../../components/utils/global";
import {h} from "preact";
import {Constrains} from "../constrains";
import {Image} from "../../../directories/picture/image";
import {determineMultilineTextDimensions} from "./text/helpers";
import Word from "../../../word";

export const overlaps = (image: ImageProps, imagesToOverlapWith: ImageProps[]): boolean => {
    const imageEndX = image.x + image.width;
    const imageEndY = image.y + image.height;

    for (let i = 0; i < imagesToOverlapWith.length; i++){
        const overlapImg = imagesToOverlapWith[i];
        if (overlapImg.x < imageEndX && overlapImg.y < imageEndY) {
            return true;
        }
    }

    return false;
}

export const findBlankArea = (images: ImageProps): Area => {
    const result = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        folder: "0"
    } as Area;

    // first randomly find some empty spot
    // tehn go --y and find nearest obj
    // then go --x and find neares obj
    // you got somehow blank area!

    return result;
}



export const correctOverlap = (drawArea: DrawArea, obj: Area): boolean => {
    // start from 0:0
    const relativeObjX = obj.x - drawArea.x;
    const relativeObjY = obj.y - drawArea.y;

    if (relativeObjX > drawArea.width || relativeObjY >= drawArea.height) {
        // throw new Error('So you wanna start your print outside of draw area? U crazy? {W:'+drawArea.width+', H:'+drawArea.height+', x:'+imageProps.x+', y:'+imageProps.y+', }');
        return false;
    }

    if (isWord(obj)){
        const word = obj as WordProps;
        word.width = drawArea.width;
        determineMultilineTextDimensions(word);
        // TODO: correctingOverlap for Word
    } else {
        const img = obj as ImageProps;
        const x2 = img.width + relativeObjX;
        let widthEdited = false;

        // X overlaps?
        if (x2 > drawArea.width) {
            img.width = drawArea.width - relativeObjX;
            img.height = computeHeight(img.width, img.ratio);
            widthEdited = true;
        }

        let y2 = img.height + relativeObjY;

        // Y still overlaps?
        if (y2 > drawArea.height) {
            img.height = drawArea.height - relativeObjY;
            img.width = computeWidth(img.height, img.ratio);
        }
    }



    return true;
}

export const isWord = (elm: Area): boolean => {
    if ((elm as WordProps).text) {
        return true;
    }

    return false;
}
