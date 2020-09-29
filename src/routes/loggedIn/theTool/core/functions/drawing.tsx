import {Area, ImageProps, TShirtColors, WordProps} from "../../generationModel";
import {apiUrlPrefix} from "../../../../../components/utils/global";
import {h} from "preact";
import MultilineText from "./text/multilineText";
import {glob_generationModel} from "../imagePlacer";

export const drawObj = (obj: Area) => {
    if ((obj as ImageProps).path) {
        const i = obj as ImageProps;
        return <image x={i.x} y={i.y} href={apiUrlPrefix + 'imagefiles/thumb/' + i.path} width={i.width} height={i.height} />;
    } else if ((obj as WordProps).text) {

        const t = obj as WordProps;
        return  <MultilineText w={t} />

    } else {
        return ;
    }

}

if (!Array.prototype.hasOwnProperty("last")) {
    Object.defineProperty(Array.prototype, "last", {
        get() {
            return this[this.length - 1];
        }
    });
}
