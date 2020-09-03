import {Component, h} from "preact";
import * as style from "./menuStyle.css";
import {AuthorizationService} from "../../services/authorization.service";
import {route} from "preact-router";
import {store} from "../../model/store";

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
        // TODO: clean default menu
        return ;

        // if (!hasntGotTheirOwnMenu.includes(this.props.routeChange)){
        //     return ;
        // }
        if (store.getState().authenticated) {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton + " grayButton"} href="/instructions">Basic instructions</button>
                    </div>

                    <div class={style.c}>
                        <button type="submit" class={style.menuButton + " grayButton"} onClick={()=> {route("/settings")}}>Settings</button>
                        <button type="submit" class={style.menuButton + " wireButton"} onClick={()=>{route("/theTool")}}>The Tool</button>
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

