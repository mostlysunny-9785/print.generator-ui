import {Composition} from "./composition";
import {Area, ImageProps, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {correctOverlap, overlaps} from "../functions/area";
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
        const sortedElements: Area[] = [...images]; // just images so far
        sortedElements.sort((a, b) => a.folder - b.folder);


        this.place(images,  1, area);
        toDraw = toDraw.concat(images);
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

    private place(images: ImageProps[], columnCount: number, area: DrawArea) {
        let actualPlace: Loc = {x: 0, y: 0};
        const columns: Column[] = this.createColumns(area, columnCount);
        // console.log({columnCount});

        for (let imagePointer = 0; imagePointer < images.length; imagePointer++){
            const image = images[imagePointer];
            const actualColumn = imagePointer % columnCount;
            const column = columns[actualColumn];
            this.resetImageToDefaultDimensions(image);

            // set position
            image.x = column.x;
            image.y = column.actualY;

            // calculate overlap
            const overlapSuccessful = correctOverlap(column, image); // correct width to maximize column
            const constrains = this.checkConstrains(image);

            // check if we can still fit it into current column
            if (this.doesItFitHorizontally(column, image, actualPlace) && overlapSuccessful && constrains) {
                // yes we can place it, so just make it that it counts
                column.actualY += (image.height + 10); // add some overlap too :)
            } else {
                // suuucks this doesent fit!
                // if (actualColumn + 1 === columnCount) { // does we have another column?
                    // noo we dont have another column - reset, increase columnCount and start again
                    this.place(images, columnCount + 1, area);
                //     break;
                // } else {
                //     // this is fine, just break this placing and continue with next column
                //     break;
                // }
            }


        }

        // columns.forEach((column, actualColumn) => { // for every column try to fit file
        //     actualPlace.x = column.x;
        //     actualPlace.y = column.y;
        //
        //     for (; imagePointer < images.length; imagePointer++){
        //         // prepare image to draw
        //         const image = images[imagePointer];
        //         this.resetImageToDefaultDimensions(image);
        //
        //
        //         image.x = actualPlace.x;
        //         image.y = actualPlace.y;
        //
        //         const overlapSuccessfull = correctOverlap(columnArea, image); // correct width to maximize column
        //
        //     }
        // });
    }

    private doesItFitHorizontally(area: DrawArea, toPlace: Area): boolean {
        const afterPlaceHeight = toPlace.y + toPlace.height;
        if (afterPlaceHeight > area.height) {
            return false;
        } else {
            return true;
        }
    }

    private resetImageToDefaultDimensions(image: ImageProps) {
        image.width = image.originalWidth;
        image.height = image.originalHeight;
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
                actualY: 0
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
