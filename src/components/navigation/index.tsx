import {Component, h} from "preact";
import * as style from "./menuStyle.css";
import {route} from "preact-router";
import {store} from "../../model/store";

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

                <div class={style.b}>
                    <button class={settingsStyle} onClick={() => {route("/settings")}}>Settings</button>
                    <button class={foldersStyle} onClick={() => {route("/home")}}>Folders</button>
                    <button class={informationsStyle} onClick={() => {route("/instructions")}}>Informations</button>
                </div>

                <div class={style.c}>

                </div>
            </div>
        )


    }


};

