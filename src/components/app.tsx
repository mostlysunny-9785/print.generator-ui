import {Component, FunctionalComponent, h} from "preact";
import {route, Route, Router, RouterOnChangeArgs} from "preact-router";


import Profile from "../routes/profile";
import NotFoundPage from '../routes/notfound';
import Header from "./header";
import Home from "../routes/home";
import Scrapper from "../routes/scrapper";
import Login from "../routes/login/login";
import {AuthorizationService} from "../services/authorization.service";
import Redirect from "./Redirect";
import LoggedInHome from "../routes/loggedInHome";
import Menu from "./menu";

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
        }
    }

    private handleRoute = e => {
        console.log(e.url);
        if (e.url !== '/' && e.url !== '/login') {
            const isAuthed = AuthorizationService.isAuthenticated;
            if (!isAuthed) {
                console.log("redirecting");
                route('/login', true);
            }
        }
        this.setState({currentUrl: e.url});
    };

    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
        return (

            <div id="app">
                <Header  routeChange={this.state.currentUrl} />
                <Router onChange={this.handleRoute}>

                    <Route path="/" component={Home} />
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={LoggedInHome} />


                    <Route path="/scrapper" component={Scrapper} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/profile/:user" component={Profile} />
                    <NotFoundPage default />
                </Router>
                <Menu routeChange={this.state.currentUrl} />
            </div>
        );
    }


};
