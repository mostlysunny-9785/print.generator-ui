import { Component, h } from "preact";
import {
    ChanelModel,
    ImageModel
} from "../../../components/utils/images.service";
import * as style from "./style.css";

export interface ScrapperChanelProps {
    chanel: ChanelModel;
}

export class ScrapperChanel extends Component<ScrapperChanelProps, any> {
    render() {
        return <span class={style.chanelBox}>{this.props.chanel.url}</span>;
    }
}
