import { Component, FunctionalComponent, h } from "preact";
import { route, Route, Router, RouterOnChangeArgs } from "preact-router";

import Profile from "../routes/loggedIn/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import Home from "../routes/home";
import Scrapper from "../routes/loggedIn/scrapper";
import Login from "../routes/login/login";
import { AuthorizationService } from "../services/authorization.service";
import Redirect from "./Redirect";
import LoggedInHome from "../routes/loggedIn/loggedInHome";
import Menu from "./menu";
import Instructions from "../routes/public/instructions";
import Word from "../routes/loggedIn/word";
import Settings from "../routes/loggedIn/settings";

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

    private allowedRoutes = ["/", "/login", "/instructions"];

    private handleRoute = (e: any) => {
        console.log(e.url);

        if (!this.allowedRoutes.includes(e.url)) {
            // you need to be logged in to see different than allowedRoutes
            const isAuthed = AuthorizationService.isAuthenticated;
            if (!isAuthed) {
                console.log("redirecting");
                route("/login", true);
            }
        }
        this.setState({ currentUrl: e.url });
    };

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
