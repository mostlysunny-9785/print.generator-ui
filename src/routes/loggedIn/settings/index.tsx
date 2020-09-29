import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import WordMenu from "./menu";
import SettingsMenu from "./menu";
import Navigation from "../../../components/navigation";
import {AuthorizationService} from "../../../services/authorization.service";
import {UserDocument} from "../../../model/user.model";
import {PrettyPrintJson} from "../../../components/utils/global";
import {store} from "../../../model/store";
import Hider from "../../../components/hider";

interface State {
    userSession?: UserDocument
}

export default class Settings extends Component<any, State> {


    constructor() {
        super();
        this.state = {};
        const state = store.getState().userReducer;
        this.state = { userSession: state };
    }


    render () {
        return (
            <div>
                <Navigation> </Navigation>
                <div class={style.editor}>

                    <Hider headline={'Medium'} visible={true}>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Type: </div>
                            <input
                                type="text"
                                placeholder="Tshirt"
                                class={style.input + " " + style.settingsElem}
                            />
                            <div class={style.settingsElemBig} style={{color: '#A6A6A6'}}>* Just one medium is operational</div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Specification #1: </div>
                            <select class={style.input + " " + style.settingsElem}>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                            </select>
                            <div class={style.settingsElemBig} style={{color: '#A6A6A6'}}> </div>
                        </div>

                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Specification #2: </div>
                            <div class={style.settingsElemBig}>
                                <label class={"radioContainer " + style.radio }>Tshirt
                                    <input type="radio"
                                           checked={true}
                                    />
                                    <span class="radioCheckmark"> </span>
                                </label>
                                <label class={"radioContainer " + style.radio }>Long sleeve
                                    <input type="radio"
                                    />
                                    <span class="radioCheckmark"> </span>
                                </label>
                            </div>
                            <div class={style.settingsElem} style={{color: '#A6A6A6'}}> </div>
                        </div>
                    </Hider>

                    <Hider headline={'Print'} visible={true}>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Color: </div>
                            <select class={style.input + " " + style.settingsElem}>
                                <option value="white">Colorful picture</option>
                                <option value="black">Black and white</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Black text"
                                class={style.input + " " + style.settingsElem}
                            />
                            <div class={style.settingsElem}> </div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Composition: </div>
                            <div class={style.settingsElemBig}>
                                <label class={"radioContainer " + style.radio }>Grid
                                    <input type="radio"
                                           checked={true}
                                    />
                                    <span class="radioCheckmark"> </span>
                                </label>
                                <label class={"radioContainer " + style.radio }>Random
                                    <input type="radio"
                                    />
                                    <span class="radioCheckmark"> </span>
                                </label>
                            </div>
                            <div class={style.settingsElem} style={{color: '#A6A6A6'}}> </div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> Canvas size: </div>
                            <select class={style.input + " " + style.settingsElem}>
                                <option value="white">W 420 mm</option>
                                <option value="black">Black and white</option>
                            </select>
                            <select class={style.input + " " + style.settingsElem}>
                                <option value="white">H 594 mm</option>
                                <option value="black">Black and white</option>
                            </select>
                            <div class={style.settingsElem}> </div>
                        </div>
                        <div class={style.settingsLine}>
                            <div class={style.settingsElem}> </div>
                            <div class={style.settingsElemMega} style={{color: '#A6A6A6'}}>* You can freely adjust the size of the canvas to the preferred size of the local manufacturer</div>

                        </div>
                    </Hider>
                    <div style={{color: '#A6A6A6'}}>
                        <Hider headline={'Production'}> </Hider>
                    </div>

                    <div style={{height: '150px'}}> </div>
                </div>

                <SettingsMenu> </SettingsMenu>
            </div>
        );
    }
}



