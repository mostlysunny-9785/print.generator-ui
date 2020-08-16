import { Component, h } from "preact";
import * as style from "./style.css";
import { AuthorizationService } from "../../services/authorization.service";
import { route } from "preact-router";
import * as menuStyle from "../../components/menu/menuStyle.css";
import {store} from "../../model/store";

interface LoginState {
    username?: string;
    password?: string;
    passwordHint?: string;
}

const passwordMessage = "not needed";
const username = "nobody #10156";

export default class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: username,
            password: "",
            passwordHint: passwordMessage
        };
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        // console.log(this.state);
        if (store.getState().authenticated) {
            route("/home", true);
        }
        var pass = this.state.password;
        if (this.state.username === username) {
            pass = 'dummy'
        }
        AuthorizationService.authenticate(this.state.username || "", pass || "").then(result => {
            console.log({result});
            if (result == undefined) {
                // wrong passport
            } else {
                route("/home", true);
            }
            // if (result) {
            //     route("/home", true);
            // }
        });
    };

    onPasswordChange = (e: any) => {
        this.setState({ password: e.target.value });
    };

    onNameChange = (e: any) => {
        let newUsername = e.target.value;

        if (this.state.username !== username) {
            this.setState({passwordHint: 'password'})
        } else {
            this.setState({passwordHint: passwordMessage})
        }

        this.setState({ username:  newUsername});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div class={style.loginForm}>
                        <input
                            type="text"
                            placeholder="username"
                            value={this.state.username}
                            onInput={this.onNameChange}
                        />
                        <input
                            type="password"
                            placeholder={this.state.passwordHint}
                            value={this.state.password}
                            onInput={this.onPasswordChange}
                        />
                        {/*<input type="text" value={this.state.password} onInput={this.onPasswordChange} />*/}
                    </div>

                    <div class={menuStyle.main}>
                        <button type="submit" class={style.loginButton}>
                            Continue to beta
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
