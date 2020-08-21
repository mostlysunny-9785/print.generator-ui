import {Component, h} from "preact";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";



export default class HomeMenu extends Component<any, any> {


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                        <button type="submit" class={style.menuButton + ' ' + style.mainMenuButton} onClick={()=> {route("/home")}}>Modules</button>

                        <div class={style.restButtons}>
                            <button type="submit" class={style.menuButton + " wireButton"}>Add</button>
                            <button type="submit" class={style.menuButton + " wireButton"}>Delete</button>
                            <button type="submit" class={style.menuButton + " wireButton"}>Send</button>
                        </div>
                </div>
            );
    }


};

