import {Component, FunctionalComponent, h} from "preact";
import { Link } from "preact-router/match";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";



export default class WordMenu extends Component<any, any> {


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton} onClick={()=> {route("/home")}}>Back to home</button>
                    </div>

                    <div class={style.c}>
                        <button type="submit" class={style.menuButton + " grayButton"}>Shortcuts</button>
                        <button type="submit" class={style.menuButton + " wireButton"}>Picture</button>
                    </div>
                </div>
            );
    }


};

