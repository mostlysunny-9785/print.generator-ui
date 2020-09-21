import {apiUrlPrefix} from "../../../../components/utils/global";
import {h} from "preact";
import {DrawArea} from "./toolCore";
import {ImageProps, WordProps} from "../generationModel";
import {ImagesService} from "../../../../services/images.service";
import {WordModel} from "../../../../services/words.service";


export const fillImageObj = (i: ImageProps) => {
    return <image x={i.x} y={i.y} href={apiUrlPrefix + 'imagefiles/' + i.path} width={i.width} />;
}

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

export const getImage = (path: string): Promise<ImageProps> => {

    return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = apiUrlPrefix + 'imagefiles/' + path;
        img.onload = () => {
            const imgProps = {
                x: 0,
                y: 0,
                width: img.width,
                height: img.height,
                originalWidth: img.width,
                originalHeight: img.height,
                ratio: getRatio(img.width, img.height),
                path: path} as ImageProps;
            resolve(imgProps);
        };
    })
}
// does image overlaps with different image?
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

export const revertImageDimensionsToOriginal = (image: ImageProps): ImageProps => {
    image.width = image.originalWidth;
    image.height = image.originalHeight;
    return image;
}

export const getWord = (word: WordModel): WordProps => {
    return {
        x: 0,
        y: 0,
        size: 60,
        text: word.content,
        height: 0
    } as WordProps;
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
    // if (widthEdited) {
    //
    // } else {
    //     y2 = imageProps.height + imageProps.y;
    // }

    // Y still overlaps?
    if (y2 > drawArea.height) {
        imageProps.height = drawArea.height - imageProps.y;
        imageProps.width = computeWidth(imageProps.height, imageProps.ratio);
    }
}

export const randomObjPosition = (drawArea: DrawArea, random: boolean) => {
    const randomX = Math.floor(Math.random() * Math.floor(drawArea.width));
    const randomY = Math.floor(Math.random() * Math.floor(drawArea.height));
}
