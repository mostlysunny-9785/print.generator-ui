import {Component, FunctionalComponent, h} from "preact";
import { Link } from "preact-router/match";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import DropdownMenu from "../../../components/dropdown";



export default class SettingsMenu extends Component<any, any> {


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                    <div class={style.restButtons}>
                        <button type="submit" class={style.menuButton + " wireButton"} onClick={()=>{route('/send')}}>Send</button>
                    </div>
                </div>
            );
    }


};

