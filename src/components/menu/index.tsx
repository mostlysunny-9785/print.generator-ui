import {Component, FunctionalComponent, h} from "preact";
import { Link } from "preact-router/match";
import * as style from "./menuStyle.css";
import {AuthorizationService} from "../../services/authorization.service";
import {route} from "preact-router";
import {hasTheirOwnMenu} from "../utils/global";

export interface MenuProps {
    routeChange: string
}

export default class Menu extends Component<MenuProps, any> {
    logout = () => {
        AuthorizationService.signout().then(()=>{
            route("/", true);
        });
    }


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {

        if (hasTheirOwnMenu.includes(this.props.routeChange)){
            return ;
        }
        if (AuthorizationService.isAuthenticated) {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton + " grayButton"} href="/instructions">Basic instructions</button>
                    </div>

                    <div class={style.c}>
                        <button type="submit" class={style.menuButton + " grayButton"} onClick={()=> {route("/settings")}}>Settings</button>
                        <button type="submit" class={style.menuButton + " wireButton"}>Send</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton + " grayButton"} onClick={() => route("/instructions")}>Basic instructions</button>
                    </div>

                    <div class={style.c}>
                        <button type="submit" class={style.menuButton + " grayButton"}>Settings</button>
                        <button type="submit" class={style.menuButton + " wireButton"} disabled>Send</button>
                    </div>
                </div>
            );
        }


    }


};

