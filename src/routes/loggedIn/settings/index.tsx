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

interface State {
    userSession?: UserDocument
}

export default class Settings extends Component<any, State> {


    constructor() {
        super();
        this.state = {};
        const state = store.getState();
        this.state = { userSession: state };
    }


    render () {
        return (
            <div>
                <Navigation> </Navigation>
                <div class={style.editor}>
                    Settings

                    <PrettyPrintJson data={this.state.userSession} />
                </div>

                <SettingsMenu> </SettingsMenu>
            </div>
        );
    }
}



