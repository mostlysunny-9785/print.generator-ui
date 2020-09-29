import {Composition} from "./composition";
import {Area, ImageProps, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {computeHeight, getRandom} from "../helpers";
import {Constrains} from "../constrains";
import {correctOverlap, overlaps, resetToDefaultDimensions} from "../functions/area";
import {drawObj} from "../functions/drawing";
import Word from "../../../word";
import {determineMultilineTextDimensions} from "../functions/text/helpers";


class RandomCompositionClass implements Composition {
    compose(images: ImageProps[], words: WordProps[], area: DrawArea): any[] {
        const toDraw: any = [];



        // draw images
        this.drawImages(toDraw, images, area);
        this.drawWords(toDraw, words, area)
        console.log({toDraw});
        const map = toDraw.map(drawObj);


        return map;
    }


    private drawWords(toDraw: any[], words: WordProps[], area: DrawArea) {
        words.forEach((word: WordProps) => {
            resetToDefaultDimensions(word);
            this.randomisePosition(word, area);
            this.randomizeWordDimensions(word, area, words.length);
            determineMultilineTextDimensions(word);
            toDraw.push(word);
        })
    }

    private drawImages(toDraw: any[], images: ImageProps[], area: DrawArea) {
        let overlappingImages = 0;
        images.forEach((image: ImageProps) => {
            for (let i = 0; i < 10; i++){ // try to i times randomize position and dimension to put to area
                this.randomisePosition(image, area);
                this.randomizeDimensions(image, area, images.length);

                if (!overlaps(image, toDraw)) { // try to put picture on blank space
                    break;
                } else {
                    if (i === 99) {
                        overlappingImages++;
                    }

                }

            }
            correctOverlap(area, image);
            toDraw.push(image);
        });
    }


    private randomizeDimensions(image: ImageProps, area: DrawArea, objCount: number) {
        const areaPerImage = (area.width * area.height) / objCount; // how much mm^2 per image
        const useableArea = Math.sqrt((areaPerImage)) * 1.5; // some black magic
        // arr = w * h
        // w = arr / (w * r)
        // 2w = arr / r
        // w = arr / 2r
        // arr = 2w*r
        // w = arr/2*r
        const width = useableArea / (2 * image.ratio);
        // image.width = getRandom(Constrains.minimumPictureWidth, image.originalWidth);
        image.width = width;
        image.height = computeHeight(image.width, image.ratio);
    }

    private randomizeWordDimensions(word: WordProps, area: DrawArea, objCount: number) {
        word.width = getRandom(Constrains.minimumPictureWidth, area.width - word.x);
        word.height = getRandom(Constrains.minimumPictureWidth, area.height - word.y); // TODO
    }


    private randomisePosition(obj: Area, area: DrawArea) {
        obj.x = getRandom(0, area.width);
        obj.y = getRandom(0, area.height);
    }

}


export var RandomComposition = new RandomCompositionClass();
