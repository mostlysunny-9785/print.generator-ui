import {ImageProps, WordProps} from "../../generationModel";
import {DrawArea} from "../toolCore";


export interface Composition {
    compose: (images: ImageProps[], words: WordProps[], area: DrawArea) => any[]
}
