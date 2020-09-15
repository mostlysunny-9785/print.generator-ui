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
    folders: FolderModel[],
    words: WordModel[],
    images: ImageModel[],
    generationModel: GenerationModel

}

export default class TheTool extends Component<any, State> {
    constructor() {
        super();
        this.state = {
            folders: [],
            words: [],
            images: [],
            generationModel: JSON.parse(JSON.stringify(DefaultGenerationModel))
        };
    }


    componentDidMount() {
        FoldersService.get().then(folders => {
            this.setState({folders});
        });

        ImagesService.getAllImages().then(images => {
            this.setState({images});
        });

        WordsService.getAll().then(words => {
            this.setState({words});
        });
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
                <TheToolCore model={this.state.generationModel} images={this.state.images} words={this.state.words} />
                {/*<TheToolMenu />*/}
            </div>
        );
    }
}



