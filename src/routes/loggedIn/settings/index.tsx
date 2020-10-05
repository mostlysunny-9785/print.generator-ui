import {Component, h} from "preact";
import * as style from "./style.css";
import SettingsMenu from "./menu";
import Navigation from "../../../components/navigation";
import {UserDocument} from "../../../model/user.model";
import {store} from "../../../model/store";
import Hider from "../../../components/hider";
import {CompositionTypes, GenerationModel, PrintColors, TShirtColors} from "../theTool/generationModel";
import {SettingsService} from "../../../services/settings.service";
import {userActionUpdateSettings} from "../../../model/user_reducer_actions";

interface State {
    userSession?: UserDocument,
    composition: CompositionTypes,
    tshirtColor: TShirtColors,
    printColor: PrintColors
}

export default class Settings extends Component<any, State> {


    constructor() {
        super();
        this.state = { composition: CompositionTypes.GRID, tshirtColor: TShirtColors.DARK, printColor: PrintColors.COLORFULL};

    }

    componentDidMount() {
        const userSettings: GenerationModel = store.getState().userReducer.settings;
        if (userSettings) {
            this.setState({
                composition: userSettings.composition,
                tshirtColor: userSettings.tShirtColor,
                printColor: userSettings.printColor
            })
        }

    }

    changeTshirtColor = (event: any) => {
        const stringColor: string = TShirtColors[event.target.value];
        const newColor: TShirtColors = event.target.value === TShirtColors.DARK.toString() ? TShirtColors.DARK : TShirtColors.LIGHT; // TODO: well...

        const settings: GenerationModel = store.getState().userReducer.settings;
        settings.tShirtColor = newColor; // just to keep it persistent

        SettingsService.update(settings).then(newSettings => {
            // console.log({newSettings});
            store.dispatch(userActionUpdateSettings(settings));
            this.setState({tshirtColor: newColor});
        });
        // if ()

    }

    changePrintColor = (event: any) => {
        const stringColor: string = PrintColors[event.target.value];
        const newColor: PrintColors = event.target.value === PrintColors.COLORFULL.toString() ? PrintColors.COLORFULL : PrintColors.BW; // TODO: well...


        const settings: GenerationModel = store.getState().userReducer.settings;
        settings.printColor = newColor; // just to keep it persistent
        SettingsService.update(settings).then(newSettings => {
            store.dispatch(userActionUpdateSettings(settings));
            this.setState({printColor: newColor});
        });
    }

    changeComposition = (event: any) => {
        // const stringComposition: string = CompositionTypes[event.target.value];
        const composition: CompositionTypes = event.target.value === CompositionTypes.RANDOM.toString() ? CompositionTypes.RANDOM : CompositionTypes.GRID; // TODO: well...

        const settings: GenerationModel = store.getState().userReducer.settings;
        settings.composition = composition; // just to keep it persistent

        SettingsService.update(settings).then(newSettings => {
            store.dispatch(userActionUpdateSettings(settings));
            this.setState({composition: composition});
        });
    }



    render () {
        return (
            <div>
                <Navigation> </Navigation>
                <div class={style.editor}>

                    <Hider headline={'Medium'} visible={false}>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Type: </div>
                            <input
                                type="text"
                                placeholder="Tshirt"
                                class={style.input + " " + style.settingsElem}
                                value="Tshirt"
                                style={{color: "#A6A6A6"}}
                                disabled
                            />
                            <div class={style.settingsElemBig} style={{color: '#A6A6A6'}}>* Just one medium is operational</div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Specification #1: </div>
                            <select class={style.input + " " + style.settingsElem}
                                    onChange={this.changeTshirtColor}>
                                <option value={TShirtColors.LIGHT} selected={this.state.tshirtColor === TShirtColors.LIGHT}>White</option>
                                <option value={TShirtColors.DARK} selected={this.state.tshirtColor === TShirtColors.DARK}>Black</option>
                            </select>
                            <div class={style.settingsElemBig} style={{color: '#A6A6A6'}}> </div>
                        </div>

                        {/*<div class={style.settingsLine}>*/}
                        {/*    <div class={style.settingsElem}> Specification #2: </div>*/}
                        {/*    <div class={style.settingsElemBig}>*/}
                        {/*        <label class={"radioContainer " + style.radio }>Tshirt*/}
                        {/*            <input type="radio"*/}
                        {/*                   checked={true}*/}
                        {/*            />*/}
                        {/*            <span class="radioCheckmark"> </span>*/}
                        {/*        </label>*/}
                        {/*        <label class={"radioContainer " + style.radio }>Long sleeve*/}
                        {/*            <input type="radio"*/}
                        {/*            />*/}
                        {/*            <span class="radioCheckmark"> </span>*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*    <div class={style.settingsElem} style={{color: '#A6A6A6'}}> </div>*/}
                        {/*</div>*/}
                    </Hider>

                    <Hider headline={'Print'} visible={false}>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Color: </div>

                                <select class={style.input + " " + style.settingsElem} onChange={this.changePrintColor}>
                                    <option value={PrintColors.COLORFULL} selected={this.state.printColor === PrintColors.COLORFULL}>Colorful picture</option>
                                    <option value={PrintColors.BW} selected={this.state.printColor === PrintColors.BW}>Black and white picture</option>
                                </select>

                            <input
                                type="text"
                                value={this.state.tshirtColor === TShirtColors.DARK ? "White text" : "Dark text"}
                                class={style.input + " " + style.settingsElem}
                                style={{color: "#A6A6A6"}}
                                disabled
                            />
                            <div class={style.settingsElem}> </div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Composition: </div>
                            <div class={style.settingsElemBig}>
                                <label class={"radioContainer " + style.radio }>Grid
                                    <input type="radio"
                                           value={CompositionTypes.GRID}
                                           onChange={this.changeComposition}
                                           checked={this.state.composition === CompositionTypes.GRID}
                                    />
                                    <span class="radioCheckmark"> </span>
                                </label>
                                <label class={"radioContainer " + style.radio }>Random
                                    <input type="radio"
                                           value={CompositionTypes.RANDOM}
                                           onChange={this.changeComposition}
                                           checked={this.state.composition === CompositionTypes.RANDOM}
                                    />
                                    <span class="radioCheckmark"> </span>
                                </label>
                            </div>
                            <div class={style.settingsElem} style={{color: '#A6A6A6'}}> </div>
                        </div>
                        <div class={style.settingsLine} style={{marginBottom: "0px"}}>
                            <div class={style.settingsElem}> Canvas: </div>
                            <select class={style.input + " " + style.settingsElem}>
                                <option value="A3">A3</option>
                            </select>

                            <div class={style.settingsElemBig}> </div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> </div>
                            <div class={style.settingsElemMega} style={{color: '#A6A6A6'}}>* You can freely adjust the size of the canvas to the preferred size of the local manufacturer</div>

                        </div>
                    </Hider>

                    <Hider headline={'Production'} disabled={true}> </Hider>

                    <div style={{height: '150px'}}> </div>
                </div>
                <div class="footerSpacer"> </div>
                <SettingsMenu> </SettingsMenu>
            </div>
        );
    }
}



