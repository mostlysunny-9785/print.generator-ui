import {Component} from "preact";
import {ChanelModel, ImageModel} from "../../../components/utils/images.service";
import * as style from "./style.css";

export interface ScrapperChanelProps {
    chanel: ChanelModel
}

export class ScrapperChanel extends Component<ScrapperChanelProps, any> {
    render (props: preact.RenderableProps<ImageModel> | undefined, state: Readonly<any> | undefined, context: any): preact.ComponentChild {
        return (
            <span class={style.chanelBox}>
                {this.props.chanel.url}
            </span>
        );
    }

}
