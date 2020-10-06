import {Component, h} from "preact";
import * as style from "./style.css";
import TheToolMenu from "./menu";
import TheToolCore from "./core/toolCore";
import GenerationModelPicker from "./generationModelPicker/generationModelPicker";
import {CompositionTypes, GenerationModel, PrintColors, TShirtColors} from "./generationModel";
import UserModelPicker from "./generationModelPicker/userModelPicker";
import {store} from "../../../model/store";
import {setGenerationAction} from "../../../model/generation_reducer_actions";
import {UserDocument} from "../../../model/user.model";
import SendHeader from "./header";

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
        if (key !== 'generate') {
            let activeGenModel: any = store.getState().generationReducer;
            activeGenModel[key] = value;
            console.log({key, value});
            store.dispatch(setGenerationAction(activeGenModel));
        } else {
            this.setState((state: State) => ({ // just trigger render
                regenerate: !state.regenerate
            }));
        }
    }

    regenerate = () => {
        this.onModelChange('generate', '');
    }

    render () {

        // console.log({state: this.state.generationModel.drawAreaVisible, stejt: this.state.generationModel});

        const genModel: GenerationModel = store.getState().generationReducer;
        const userModel: UserDocument = store.getState().userReducer;

        let amIAdmin: boolean = ['kuba', 'honza'].includes(userModel.email);


        if (amIAdmin) {
            const grayscale = genModel.printColor === PrintColors.BW ? "grayscale(1)" : "";

            return <div>
                <SendHeader />

                <div style={{filter: grayscale}}>
                    <TheToolCore model={genModel} admin={true} />
                </div>

                <div class={style.generationPanel}>
                    <GenerationModelPicker model={genModel} modelChange={this.onModelChange} />
                </div>

                <div className={style.userPanel}>
                    <UserModelPicker model={genModel} modelChange={this.onModelChange}/>
                </div>

                <TheToolMenu isRandom={false} regenerate={this.regenerate}  />
            </div>
        } else {
            const grayscale = userModel.settings.printColor === PrintColors.BW ? "grayscale(1)" : "";
            if (userModel && userModel.settings && genModel) { // adjust generatio model based on settings
                genModel.tShirtColor = userModel.settings.tShirtColor;
                genModel.composition = userModel.settings.composition;
                genModel.printColor = userModel.settings.printColor;
                genModel.picturesCount = 100;
                genModel.wordsCount = 100;

                store.dispatch(setGenerationAction(genModel));
            }

            const isRandom = genModel.composition === CompositionTypes.RANDOM;

            const backgroundColor = genModel.tShirtColor === TShirtColors.LIGHT ? 'url(\'/assets/shirt.svg\')' : 'url(\'/assets/shirt_dark.svg\')';

            return <div>
                <SendHeader />
                <div class={style.scaled}>
                    <div class={style.resultCentering} style={{backgroundImage: backgroundColor, filter: grayscale}}>
                        <TheToolCore model={genModel} admin={false} />
                    </div>
                </div>
                <TheToolMenu isRandom={isRandom} regenerate={this.regenerate} />
            </div>
        }

    }
}



