import {Component, h} from "preact";
import * as style from "./style.css";
import {GeneratedModel, ToolService} from "../../../services/tool.service";
import {apiUrlPrefix} from "../../../components/utils/global";

interface State {
    images: GeneratedModel[];
}
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class Archive extends Component<any, State> {
    constructor() {
        super();
        this.state = { images: [] };
    }

    componentDidMount() {
        ToolService.list().then((images: GeneratedModel[]) => {
            // parse dates
            images.forEach(image => {
                image.createdAt = new Date(image.createdAt);
            })

            // sort by date
            const tst = images.sort((a, b) => {
                return a.createdAt.valueOf() - b.createdAt.valueOf();
            });
            console.log({tst});



            this.setState({images});
        });
    }

    render () {

        const toRender: any[] = [];
        this.state.images.forEach((image: GeneratedModel, index: number) => {
            const url = apiUrlPrefix + image.previewFilename;
            const filename = "tshirt_#" + index + ".png";
            const filesize = Math.round((image.fileSize / 1024 / 1024) * 100) / 100 ;
            toRender.push(

                <div class={style.line}>
                    <div class={style.full}>Tshirt #{index}</div>
                    <div class={style.half}>{image.createdAt.getDate()} {monthNames[image.createdAt.getMonth()]}</div>
                    <div class={style.half}>{image.createdAt.getFullYear()}</div>
                    <div class={style.link}>
                        <a href={apiUrlPrefix + image.filename} download={filename} target="_blank" style={{color: "#2E76F6"}}>download</a>
                        &nbsp;
                        ({filesize} MB)
                    </div>
                    <div></div>
                        {/*<div>(gen time {Math.round(image.generationTime * 100) / 100} s)</div>*/}

                </div>)
        });

        return (
            <div style={{paddingBottom: "10px"}}>
                {toRender}
            </div>
        );
    }
}



