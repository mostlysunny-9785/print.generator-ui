import {Component, h} from "preact";
import * as style from "./style.css";
import {AuthorizationService} from "../../services/authorization.service";
import {route} from "preact-router";
import {hasGotTheirOwnMenu, hasTheirOwnHeader} from "../utils/global";
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


        for (var i = 0; i < hasTheirOwnHeader.length; i++) {
            if (this.props.routeChange.includes(hasTheirOwnHeader[i])) {
                return ;
            }
        }


        var user = store.getState();

        if (store.getState().authenticated) {
            return (
                <div class={style.main}>
                    <div class={style.a}> </div>
                    <div class={style.b} onClick={()=>{route("/home")}}>
                        ~{user.email}, X folders, unset medium
                    </div>
                    <div class={style.c}>
                        {/*<a href="/profile">Edit profile</a>*/}
                        {/*<a href="#" onClick={this.logout}>Logout</a>*/}
                    </div>
                </div>
            );
        } else {
            return (
                <div class={style.main}>
                    <div class={style.a}></div>
                    <div class={style.b}>
                        Hello, for early access please just continue to beta as <a href="">nameless nobody #10156</a>
                    </div>
                    <div class={style.c}>
                        {/*<a href="/register">Sign up</a>*/}
                        {/*<a href="/login">Log in</a>*/}
                    </div>
                </div>
            );
        }


    }


};

