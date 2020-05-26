import { Component, h } from "preact";
import { route, Route, Router } from "preact-router";

import Profile from "../routes/loggedIn/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import Home from "../routes/home";
import Scrapper from "../routes/loggedIn/scrapper";
import Login from "../routes/login/login";
import { AuthorizationService } from "../services/authorization.service";
import LoggedInHome from "../routes/loggedIn/loggedInHome";
import Menu from "./menu";
import Instructions from "../routes/public/instructions";
import Word from "../routes/loggedIn/word";
import Settings from "../routes/loggedIn/settings";
import {store} from "../model/store";
import {handleRouteChange} from "./routerHandler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export default class App extends Component<any, any> {
    constructor() {
        super();
        this.state = {
            currentUrl: "/"
        };
    }

    componentDidMount() {
        AuthorizationService.getSession().then(); // on app start get session from backend

        // listen on store change to catch if user is autenticated
        store.subscribe(() => {
            if (store.getState().authenticated && this.state.currentUrl === '/login'){
                route("/home", true);
            }
        })
    }

    private handleRoute = (e: any) => {
        this.setState({ currentUrl: handleRouteChange(e) });
    }



    render(
        props?: preact.RenderableProps<any>,
        state?: Readonly<any>,
        context?: any
    ): preact.ComponentChild {
        return (
            <div id="app">
                <Header routeChange={this.state.currentUrl} />
                <Router onChange={this.handleRoute}>
                    <Route path="/" component={Home} />
                    <Route path="/instructions" component={Instructions} />
                    <Route path="/login" component={Login} />

                    <Route path="/home" component={LoggedInHome} />
                    <Route path="/scrapper" component={Scrapper} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/word" component={Word} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/profile/:user" component={Profile} />
                    <NotFoundPage default />
                </Router>
                <Menu routeChange={this.state.currentUrl} />
            </div>
        );
    }
}
