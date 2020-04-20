import { FunctionalComponent, h } from "preact";
import {route, Route, Router, RouterOnChangeArgs} from "preact-router";


import Profile from "../routes/profile";
import NotFoundPage from '../routes/notfound';
import Header from "./header";
import Home from "../routes/home";
import Scrapper from "../routes/scrapper";
import Login from "../routes/login/login";
import {AuthorizationService} from "../services/authorization.service";
import Redirect from "./Redirect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const App: FunctionalComponent = () => {
    let currentUrl: string;


    var handleRoute = e => {
        if (e.url != '/' || e.url != '/login') {
            const isAuthed = AuthorizationService.isAuthenticated;
            if (!isAuthed) route('/login', true);
        }
    };

    return (


        <div id="app">
            {AuthorizationService.isAuthenticated && <Header />}
            <Router onChange={handleRoute}>


                <Route path="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/scrapper" component={Scrapper} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
