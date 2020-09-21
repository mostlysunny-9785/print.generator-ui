import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import WordMenu from "./menu";
import TheToolMenu from "./menu";
import {ChanelModel, ImageModel, ImagesService, LoadedChanelModel} from "../../../services/images.service";
import TheToolCore from "./core/toolCore";
import GenerationModelPicker from "./generationModelPicker/generationModelPicker";
import {DefaultGenerationModel, GenerationModel} from "./generationModel";
import {FolderModel, FoldersService} from "../../../services/folders.service";
import {WordModel, WordsService} from "../../../services/words.service";

interface State {
    generationModel: GenerationModel

}

export default class TheTool extends Component<any, State> {
    constructor() {
        super();
        this.state = {
            generationModel: JSON.parse(JSON.stringify(DefaultGenerationModel))
        };
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onModelChange = (key: string, value: any) => {
        console.log({key, value});
        this.setState({
            ...this.state,
            generationModel: {...this.state.generationModel, [key]: value} as GenerationModel,
            });
    }

    render () {

        // console.log({state: this.state.generationModel.drawAreaVisible, stejt: this.state.generationModel});

        return (
            <div>
                <h2>The Tool</h2>
                <GenerationModelPicker model={this.state.generationModel} modelChange={this.onModelChange} />
                <TheToolCore model={this.state.generationModel} />
                {/*<TheToolMenu />*/}
            </div>
        );
    }
}



