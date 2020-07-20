import { Component, h } from "preact";
import { ImageModel } from "../../../components/utils/images.service";
import * as style from "./style.css";

export interface ScrapperImageProps {
    image: ImageModel;
}

export class ScapperImage extends Component<ScrapperImageProps, any> {
    render() {
        return (
            <span class={style.imageBox}>
                <img
                    class={style.image}
                    src={"api/imagefiles/" + this.props.image.filename}
                />
            </span>
        );
    }
}
