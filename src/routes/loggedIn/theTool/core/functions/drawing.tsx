import {ImageProps} from "../../generationModel";
import {apiUrlPrefix} from "../../../../../components/utils/global";
import {h} from "preact";

export const fillImageObj = (i: ImageProps) => {
    return <image x={i.x} y={i.y} href={apiUrlPrefix + 'imagefiles/' + i.path} width={i.width} height={i.height} />;
}
