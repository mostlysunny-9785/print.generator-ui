import {Composition} from "./composition";
import {Area, ImageProps, Loc, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";
import {correctOverlap, isWord, overlaps, resetToDefaultDimensions} from "../functions/area";
import {drawObj} from "../functions/drawing";
import {Constrains} from "../constrains";
import {FolderModel} from "../../../../../services/folders.service";
import {store} from "../../../../../model/store";

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
        sortedElements.sort((a, b) => {
            return a.folder.createdAt.valueOf() - b.folder.createdAt.valueOf();
        });
        console.log(sortedElements[0].created.valueOf() / Math.pow(10, 13));

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
        if (columnCount >= 6) {
            console.log({columns});
        }

        for (let imagePointer = 0; imagePointer < images.length; imagePointer++){
            const image = images[imagePointer];
            const actualColumn = imagePointer % columnCount;
            const column = columns[actualColumn];
            resetToDefaultDimensions(image);
            if (imagePointer > 37 && columnCount >= 5) {
                console.log("bigger");
            }
            // set position
            image.x = column.x;
            image.y = column.actualY;

            // calculate overlap
            const overlapSuccessful = correctOverlap(column, image); // correct width to maximize column
            const constrains = this.checkConstrains(image);

            // check if we can still fit it into current column
            if (this.doesItFitHorizontally(column, image) && overlapSuccessful && constrains) {
                // yes we can place it, so just make it that it counts
                column.actualY += (image.height + 2.5); // add some overlap too :)
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



    private createColumns(area: DrawArea, columnCount: number): Column[] {
        const columnWidth = area.width / columnCount;
        const columns: Column[] = [];
        const gap = 5; // :D

        for (let i = 0; i < columnCount; i++) {
            const columnToAdd: Column = {
                x: i * columnWidth,
                    y: 0,
                width: columnWidth,
                height: area.height,
                actualY: 0,
            };

            if (i === 0) { // first column
                // columnToAdd.width -= gap / 2;
            } else if (i+1 === columnCount) { // last column
                columnToAdd.x += gap / 2;
            } else { // rest of columns
                columnToAdd.x += gap / 2;
                columnToAdd.width -= gap / 2;
            }

            columns.push(columnToAdd);
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
