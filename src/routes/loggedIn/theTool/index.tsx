import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import WordMenu from "./menu";
import TheToolMenu from "./menu";
import {ChanelModel, ImageModel, ImagesService, LoadedChanelModel} from "../../../services/images.service";
import TheToolCore from "./core/toolCore";
import GenerationModelPicker from "./generationModelPicker/generationModelPicker";
import {DefaultGenerationModel, GenerationModel} from "./generationModel";

interface State {
    channels: LoadedChanelModel[];
    generationModel: GenerationModel

}

export default class TheTool extends Component<any, State> {
    constructor() {
        super();
        this.state = {
            channels: [],
            generationModel: JSON.parse(JSON.stringify(DefaultGenerationModel))
        };
    }


    componentDidMount() {
        ImagesService.loadChannelsWithImages().then(channel => {

            this.setState({...this.state, channels: channel});
            console.log({channelLoaded: channel, state: this.state});
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
                <TheToolCore model={this.state.generationModel} channels={this.state.channels} />
                {/*<TheToolMenu />*/}
            </div>
        );
    }
}



