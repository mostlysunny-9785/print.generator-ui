import {Component, h} from "preact";
import * as style from "./style.css";
import {AuthorizationService} from "../../services/authorization.service";
import {route} from "preact-router";
import {hasTheirOwnHeader} from "../utils/global";
import {store} from "../../model/store";

export interface HeaderProps {
    routeChange: string
}



export default class Header extends Component<HeaderProps, any> {
    constructor() {
        super();
    }

    logout = () => {
        AuthorizationService.signout().then(()=>{
            route("/", true);
        });
    }


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
        if (hasTheirOwnHeader.includes(this.props.routeChange)){
            return ;
        }

        if (store.getState().authenticated) {
            return (
                <div class={style.main}>
                    <div class={style.a}>~lablud-master</div>
                    <div class={style.b}>
                        {/*<p>Ya.C.Ya.G</p>*/}
                    </div>
                    <div class={style.c}>
                        <a href="/profile">Edit profile</a>
                        <a href="#" onClick={this.logout}>Logout</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div class={style.main}>
                    <div class={style.a}>Ya.C.Ya.G</div>
                    <div class={style.b}>
                        {/*<p>Ya.C.Ya.G</p>*/}
                    </div>
                    <div class={style.c}>
                        <a href="/register">Sign up</a>
                        <a href="/login">Log in</a>
                    </div>
                </div>
            );
        }


    }


};

