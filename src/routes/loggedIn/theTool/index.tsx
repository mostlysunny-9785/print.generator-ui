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
import UserModelPicker from "./generationModelPicker/userModelPicker";
import {store} from "../../../model/store";
import {setGenerationAction} from "../../../model/generation_reducer_actions";

interface State {
    regenerate: boolean
}

export default class TheTool extends Component<any, State> {
    constructor() {
        super();
        this.state = {
            regenerate: false
        };
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onModelChange = (key: string, value: any) => {
        console.log({key, value});
        // this.setState({
        //     ...this.state,
        //     generationModel: {...this.state.generationModel, [key]: value} as GenerationModel,
        //     }, () => {
        //
        // });
        if (key !== 'generate') {
            let activeGenModel: any = store.getState().generationReducer;
            activeGenModel[key] = value;
            store.dispatch(setGenerationAction(activeGenModel));
        } else {
            this.setState((state: State) => ({ // just trigger render
                regenerate: !state.regenerate
            }));
        }



    }

    render () {

        // console.log({state: this.state.generationModel.drawAreaVisible, stejt: this.state.generationModel});

        const genModel: GenerationModel = store.getState().generationReducer;

        return (
            <div>
                {/*<h2>The Tool</h2>*/}
                <div class={style.generationPanel}>
                    <GenerationModelPicker model={genModel} modelChange={this.onModelChange} />
                </div>

                <TheToolCore model={genModel} />

                <div className={style.userPanel}>
                    <UserModelPicker model={genModel} modelChange={this.onModelChange}/>
                </div>

                <TheToolMenu />
            </div>

        );
    }
}



