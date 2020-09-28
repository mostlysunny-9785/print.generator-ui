import {Composition} from "./composition";
import {Area, ImageProps, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {computeHeight, getRandom} from "../helpers";
import {Constrains} from "../constrains";
import {correctOverlap, overlaps} from "../functions/area";
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
            this.randomisePosition(word, area);
            this.randomizeWordDimensions(word, area);
            determineMultilineTextDimensions(word);
            toDraw.push(word);
        })
    }

    private drawImages(toDraw: any[], images: ImageProps[], area: DrawArea) {
        let overlappingImages = 0;
        images.forEach((image: ImageProps) => {
            for (let i = 0; i < 10; i++){ // try to i times randomize position and dimension to put to area
                this.randomisePosition(image, area);
                this.randomizeDimensions(image);

                if (!overlaps(image, toDraw)) {
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


    private randomizeDimensions(image: ImageProps) {
        image.width = getRandom(Constrains.minimumPictureWidth, image.originalWidth);
        image.height = computeHeight(image.width, image.ratio);
    }

    private randomizeWordDimensions(word: WordProps, area: DrawArea) {
        word.width = getRandom(Constrains.minimumPictureWidth, area.width - word.x);
        word.height = getRandom(Constrains.minimumPictureWidth, area.height - word.y); // TODO
    }


    private randomisePosition(obj: Area, area: DrawArea) {
        obj.x = getRandom(0, area.width);
        obj.y = getRandom(0, area.height);
    }

}


export var RandomComposition = new RandomCompositionClass();
