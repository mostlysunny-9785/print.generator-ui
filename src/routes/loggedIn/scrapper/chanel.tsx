import { Component, h } from "preact";
import {
    ChanelModel,
    ImageModel, ImagesService
} from "../../../components/utils/images.service";
import * as style from "./style.css";
import {ScapperImage} from "./image";

export interface ScrapperChanelProps {
    chanel: ChanelModel;
    onRemove: () => void;
}

export interface State {
    images: ImageModel[]
}

export class ScrapperChanel extends Component<ScrapperChanelProps, State> {

    componentDidMount() {
        ImagesService.loadImages(this.props.chanel._id).then(value => {
            this.setState({ images: value });
        });
    }

    onRemove = (e: any) => {
        console.log("removing");
        e.preventDefault();

        this.props.onRemove();
    };

    render() {
        const images: any = [];
        let len = 0;
        if (this.state.images) {
            this.state.images.forEach(value => {
                images.push(<ScapperImage image={value} />);
            });
            len = this.state.images.length;
        }

        return <div class={style.chanelBox}>
            <span>{this.props.chanel.url}</span>
            <button type="submit" class={style.removeButton + " grayButton"} onClick={this.onRemove}>X</button>
            <p>{images}</p>
        </div>;
    }
}
