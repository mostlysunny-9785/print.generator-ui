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
import Instructions from "../routes/loggedIn/instructions";
import Word from "../routes/loggedIn/word";
import Settings from "../routes/loggedIn/settings";
import {store} from "../model/store";
import {publicRoutes} from "./utils/global";
import TheTool from "../routes/loggedIn/theTool";
import PictureFolder from "../routes/loggedIn/directories/picture";
import PictureAdd from "../routes/loggedIn/directories/picture/add";
import WordFolder from "../routes/loggedIn/directories/word";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export default class App extends Component<any, any> {
    constructor() {
        super();
        this.state = {
            currentUrl: "/",
            urlBeforeRedirect: "/"
        };
    }

    componentDidMount() {
        AuthorizationService.getSession().then(); // on app start get session from backend

        // listen on store change to catch if user is autenticated
        store.subscribe(() => {
            if (store.getState().authenticated && this.state.currentUrl === '/login'){
                route(this.state.urlBeforeRedirect, true);
            }
        })
    }

    private handleRoute = (e: any) => {
        if (!publicRoutes.includes(e.url)) {
            // you need to be logged in to see different than allowedRoutes
            const isAuthed = store.getState().authenticated;
            if (!isAuthed) {
                this.setState({urlBeforeRedirect: e.url});
                console.log("redirecting to login");
                route("/login", true);
            }
        }
        this.setState({
            currentUrl: e.url
        });
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
                    <Route path="/" component={LoggedInHome} />
                    <Route path="/instructions" component={Instructions} />
                    <Route path="/login" component={Login} />

                    <Route path="/home" component={LoggedInHome} />
                    <Route path="/scrapper" component={Scrapper} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/word" component={Word} />

                    <Route path="/picture/:id" component={PictureFolder} />
                    <Route path="/picture/:pictureFolderId/add" component={PictureAdd} />

                    <Route path="/word/:wordFolderId" component={WordFolder} />

                    <Route path="/settings" component={Settings} />
                    <Route path="/theTool" component={TheTool} />
                    <Route path="/send" component={TheTool} />
                    <Route path="/profile/:user" component={Profile} />
                    <NotFoundPage default />
                </Router>
                <Menu routeChange={this.state.currentUrl} />
            </div>
        );
    }
}
