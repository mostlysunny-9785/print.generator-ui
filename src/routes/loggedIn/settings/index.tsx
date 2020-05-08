import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import WordMenu from "./menu";
import SettingsMenu from "./menu";

export default class Settings extends Component<any, any> {
    constructor() {
        super();
        this.state = { text: "" };
    }


    onSubmit = (e: any) => {
        alert("Submitted a todo");
        e.preventDefault();
    };

    onInput = (e: any) => {
        const { value } = e.target;
        this.setState({ value });
    };

    render () {
        return (
            <div>
                <div class={style.editor}>
                    Settings
                </div>

                <SettingsMenu></SettingsMenu>
            </div>
        );
    }
}



