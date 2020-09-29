import {Component, h} from "preact";
import * as style from "./style.css";
import {GeneratedModel, ToolService} from "../../../services/tool.service";
import {apiUrlPrefix} from "../../../components/utils/global";

interface State {
    images: GeneratedModel[];
}

export default class Archive extends Component<any, State> {
    constructor() {
        super();
        this.state = { images: [] };
    }

    componentDidMount() {
        ToolService.list().then((images: GeneratedModel[]) => {
            this.setState({images});
        });
    }

    render () {

        const toRender: any[] = [];
        this.state.images.forEach((image: GeneratedModel) => {
            const url = apiUrlPrefix + image.previewFilename;
            const filename = image.id + ".png";
            const filesize = Math.round((image.fileSize / 1024 / 1024) * 100) / 100 ;
            toRender.push(

                <div class={style.line}>
                    <div class={style.img} style={{backgroundImage: "url('" + url + "')"}}> </div>
                    <div class={style.text}>
                        ({filesize} MB)
                        <a href={apiUrlPrefix + image.filename} download={filename} target="_blank">{filename}</a>
                        (gen time {Math.round(image.generationTime * 100) / 100} s)
                    </div>
                </div>)
        });

        return (
            <div>
                {toRender}
            </div>
        );
    }
}



