import {Component, FunctionalComponent, h} from "preact";
import { Link } from "preact-router/match";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";



export default class InstructionsMenu extends Component<any, any> {


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton} onClick={()=>{route("/")}}>Back to menu</button>
                    </div>

                    <div class={style.c}>
                        <button type="submit" class={style.menuButton + " grayButton"}>I have read and agree</button>
                    </div>
                </div>
            );
    }


};

