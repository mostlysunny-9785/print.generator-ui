import {Component, FunctionalComponent, h} from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";
import {AuthorizationService} from "../../services/authorization.service";
import {route} from "preact-router";

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
        if (AuthorizationService.isAuthenticated) {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton + " grayButton"}>Basic instructions</button>
                    </div>

                    <div class={style.c}>
                        <button type="submit" class={style.menuButton + " grayButton"}>Settings</button>
                        <button type="submit" class={style.menuButton + " wireButton"}>Send</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton + " grayButton"}>Basic instructions</button>
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

