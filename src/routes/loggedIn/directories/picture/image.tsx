import { Component, h } from "preact";
import * as style from "./style.css";
import {ImageModel} from "../../../../components/utils/images.service";

export interface Props {
    image: ImageModel;
    canDelete: boolean;
}

export class Image extends Component<Props, any> {
    render() {
        return (
            <span class={style.imageBox}
                style={{backgroundImage: "url("+"/api/imagefiles/" + this.props.image.filename+")"}}
            >

                {this.props.canDelete ?
                    <button class={style.deleteButton + " grayButton"}>
                        X
                    </button> : ""}
            </span>
        );
    }
}
