import {Composition} from "./composition";
import {ImageProps, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {computeHeight, getRandom} from "../helpers";
import {Constrains} from "../constrains";
import {correctOverlap, overlaps} from "../functions/area";
import {fillImageObj} from "../functions/drawing";


class RandomCompositionClass implements Composition {
    compose(images: ImageProps[], words: WordProps[], area: DrawArea): any[] {
        const toDraw: any = [];

        let overlappingImages = 0;

        // draw images
        images.forEach((image) => {

            for (let i = 0; i < 1000; i++){ // try to i times randomize position and dimension to put to area
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
        })
        console.log({overlapingImages: overlappingImages});

        return toDraw.map(fillImageObj);
    }


    private randomizeDimensions(image: ImageProps) {
        image.width = getRandom(Constrains.minimumPictureWidth, image.originalWidth);
        image.height = computeHeight(image.width, image.ratio);
    }

    private randomisePosition(image: ImageProps, area: DrawArea) {
        image.x = getRandom(0, area.width);
        image.y = getRandom(0, area.height);
    }

}


export var RandomComposition = new RandomCompositionClass();
