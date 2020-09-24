import {ImageProps, WordProps} from "../../generationModel";
import {apiUrlPrefix} from "../../../../../components/utils/global";
import {WordModel} from "../../../../../services/words.service";
import {getRatio} from "../helpers";
import {ImageModel} from "../../../../../services/images.service";

export const getImage = (image: ImageModel): Promise<ImageProps> => {

    return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = apiUrlPrefix + 'imagefiles/' + image.filename;
        img.onload = () => {
            const imgProps = {
                x: 0,
                y: 0,
                width: img.width,
                height: img.height,
                folder: image.folderId,
                originalWidth: img.width,
                originalHeight: img.height,
                ratio: getRatio(img.width, img.height),
                path: image.filename} as ImageProps;
            resolve(imgProps);
        };
    })
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
        fontSize: "24px",
        fontFamily: 'Arial',
        text: word.content,
        height: 0,
        width: 0,
        folder: word.folderId
    } as WordProps;
}
