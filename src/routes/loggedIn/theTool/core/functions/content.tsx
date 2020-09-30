import {ImageProps, WordProps} from "../../generationModel";
import {apiUrlPrefix} from "../../../../../components/utils/global";
import {WordModel} from "../../../../../services/words.service";
import {getRatio} from "../helpers";
import {ImageModel} from "../../../../../services/images.service";
import {FolderModel, FolderType} from "../../../../../services/folders.service";
import {store} from "../../../../../model/store";
import {Constrains} from "../constrains";

export const getImage = (image: ImageModel): Promise<ImageProps> => {

    return new Promise<ImageProps>((resolve, reject) => {
        var img = new Image();
        img.src = apiUrlPrefix + 'imagefiles/thumb/' + image.filename;
        img.onload = () => {
            const imgProps = {
                x: 0,
                y: 0,
                width: img.width,
                height: img.height,
                folder: findFolder(image.folderId, FolderType.IMAGE),
                originalWidth: img.width,
                originalHeight: img.height,
                ratio: getRatio(img.width, img.height),
                path: image.filename,
                created: new Date(image.createdAt)
            } as ImageProps;

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
        fontSize: Constrains.maximumTextSize,
        fontFamily: 'Arial',
        text: word.content,
        height: 0,
        width: 0,
        folder: findFolder(word.folderId, FolderType.WORD),
        lines: word.content.split('\n'),
        smallerFontRecommended: false,
        created: new Date(word.createdAt),
    } as WordProps;
}

const findFolder = (folderId: string, folderType: FolderType): FolderModel => {
    const folders: FolderModel[] = store.getState().folderReducer;
    let folder: any = folders.filter(value => value.id.toString() === folderId && value.type === folderType);
    if (folder.length > 0) {
        folder = folder[0];
    } else {
        folder = folderId
    }

    return folder;
}
