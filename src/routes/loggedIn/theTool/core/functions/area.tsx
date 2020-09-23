// does image overlaps with different image?
import {Area, ImageProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {computeHeight, computeWidth} from "../helpers";

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
        height: 0
    }

    // first randomly find some empty spot
    // tehn go --y and find nearest obj
    // then go --x and find neares obj
    // you got somehow blank area!

    return result;
}



export const correctOverlap = (drawArea: DrawArea, imageProps: ImageProps) => {
    const x2 = imageProps.width + imageProps.x;
    let widthEdited = false;

    // X overlaps?
    if (x2 > drawArea.width) {
        imageProps.width = drawArea.width - imageProps.x;
        imageProps.height = computeHeight(imageProps.width, imageProps.ratio);
        widthEdited = true;
    }

    let y2 = imageProps.height + imageProps.y;

    // Y still overlaps?
    if (y2 > drawArea.height) {
        imageProps.height = drawArea.height - imageProps.y;
        imageProps.width = computeWidth(imageProps.height, imageProps.ratio);
    }
}
