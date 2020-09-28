import {Composition} from "./composition";
import {Area, ImageProps, Loc, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {correctOverlap, isWord, overlaps} from "../functions/area";
import {drawObj} from "../functions/drawing";
import {Constrains} from "../constrains";

export interface Column extends DrawArea {
    actualY: number;
}

class GridCompositionClass implements Composition {
    compose(images: ImageProps[], words: WordProps[], area: DrawArea): any[] {
        let toDraw: any = [];
        console.time('Grid sort')
        // sort images and words
        // const sortedElements: Area[] = [...images, ...words];
        const sortedElements: Area[] = [ ...words, ...images]; // just images so far
        sortedElements.sort((a, b) => parseInt(a.folder) - parseInt(b.folder));


        this.placeRecursive(sortedElements,  1, area);
        toDraw = toDraw.concat(sortedElements);
        console.log({toDraw});
        // draw images
        // sort images and words between each other
        // start to print one by one
          // did we run out of height before end?
            // create new column

        const map = toDraw.map(drawObj);
        console.timeEnd('Grid sort')
        return map;
    }

    private placeRecursive(objects: Area[], columnCount: number, area: DrawArea) {
        for (let column = 1; column < 100; column++) {
            const result = this.place(objects, column, area);
            if (result) {
                break;
            }
        }
    }

    private place(images: Area[], columnCount: number, area: DrawArea): boolean {
        const columns: Column[] = this.createColumns(area, columnCount);

        for (let imagePointer = 0; imagePointer < images.length; imagePointer++){
            const image = images[imagePointer];
            const actualColumn = imagePointer % columnCount;
            const column = columns[actualColumn];
            this.resetToDefaultDimensions(image);

            // set position
            image.x = column.x;
            image.y = column.actualY;

            // calculate overlap
            const overlapSuccessful = correctOverlap(column, image); // correct width to maximize column
            const constrains = this.checkConstrains(image);

            // check if we can still fit it into current column
            if (this.doesItFitHorizontally(column, image) && overlapSuccessful && constrains) {
                // yes we can place it, so just make it that it counts
                column.actualY += (image.height + 10); // add some overlap too :)
            } else {
                // suuucks this doesent fit!
                // noo we dont have another column - reset, increase columnCount and start again
                return false;
            }
        }

        return true;

    }

    private doesItFitHorizontally(area: DrawArea, toPlace: Area): boolean {
        const afterPlaceHeight = toPlace.y + toPlace.height;
        if (afterPlaceHeight > area.height) {
            return false;
        } else {
            return true;
        }
    }

    private resetToDefaultDimensions(obj: Area) {
        if (isWord(obj)) {
            const word = obj as WordProps;
            word.fontSize = Constrains.maximumTextSize;
            word.width = 0;
            word.height = 0;
        } else {
            const img = obj as ImageProps;
            img.width = img.originalWidth;
            img.height = img.originalHeight;
        }

    }

    private createColumns(area: DrawArea, columnCount: number): Column[] {
        const columnWidth = area.width / columnCount;
        const columns: Column[] = [];
        for (let i = 0; i < columnCount; i++) {
            columns.push({
                x: i * columnWidth,
                y: 0,
                width: columnWidth,
                height: area.height,
                actualY: 0,
            });
        }
        return columns;

    }

    private checkConstrains(obj: Area): boolean {
        if (obj.width < Constrains.minimumPictureWidth) {
            return false;
        } else {
            return true;
        }

    }


}


export var GridComposition = new GridCompositionClass();
