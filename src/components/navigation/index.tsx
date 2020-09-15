import {Component, h} from "preact";
import * as style from "./menuStyle.css";
import {route} from "preact-router";
import {store} from "../../model/store";
import {isMobile} from "../utils/screen";

export interface Props {
    routeChange: string

}

export default class Navigation extends Component<any, any> {

    componentDidMount() {

    }

    render() {

        let settingsStyle = style.deactivated, foldersStyle = style.deactivated, informationsStyle = style.deactivated;
        switch (window.location.pathname) {
            case ('/settings'): settingsStyle = style.active; break;
            case ('/home'): foldersStyle = style.active; break;
            case ('/instructions'): informationsStyle = style.active; break;
        }


        return (
            <div class={style.main}>
                <div class={style.a}> </div>

                <div class={style.b + ' ' + style.grayBack}>
                    <div class={settingsStyle + ' ' + style.sideMenu} onClick={() => {route("/settings")}}>Settings</div>
                    <div class={foldersStyle + ' ' + style.centerMenu} onClick={() => {route("/home")}}>Folders</div>
                    <div class={informationsStyle + ' ' + style.sideMenu} onClick={() => {route("/instructions")}}>
                        { isMobile() ? 'Info' : 'Informations' }
                    </div>
                </div>

                <div class={style.c}>

                </div>
            </div>
        )


    }


};

