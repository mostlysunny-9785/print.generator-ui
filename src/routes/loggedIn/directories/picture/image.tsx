import { Component, h } from "preact";
import * as style from "./style.css";
import {ImageModel} from "../../../../services/images.service";

export interface Props {
    image: ImageModel;
    canDelete: boolean;
    onRemoval: (img: ImageModel) => void;
}

export class Image extends Component<Props, any> {

    deletePic = () => {
        this.props.onRemoval(this.props.image);
    }

    render() {
        return (
            <span class={style.imageBox}
                style={{backgroundImage: "url("+"/api/imagefiles/" + this.props.image.filename+")"}}
            >

                {this.props.canDelete ?
                    <button class={style.deleteButton + " grayButton"} onClick={this.deletePic}>
                        X
                    </button> : ""}
            </span>
        );
    }
}
