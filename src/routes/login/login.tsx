import {Component, h} from "preact";
import * as style from "./style.css"
import {AuthorizationService} from "../../services/authorization.service";
import {route} from "preact-router";
import * as menuStyle from "../../components/menu/menuStyle.css";

interface LoginState {
    username?: string,
    password?: string
}

export default class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }


    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        AuthorizationService.authenticate().then(result => {
            if (result) {
                route('/home', true);
            }
        });
    }


    onPasswordChange = e => {
        this.setState({ password: e.target.value })
    }

    onNameChange = e => {
        this.setState({ username: e.target.value })

    }


    render () {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <div class={style.loginForm}>
                <input type="text" placeholder="Username" value={this.state.username} onInput={this.onNameChange} />
                <input type="password" placeholder="Password" value={this.state.password} onInput={this.onPasswordChange} />
                {/*<input type="text" value={this.state.password} onInput={this.onPasswordChange} />*/}
                </div>

                <div class={menuStyle.main}>
                    <button type="submit" class={style.loginButton}>Log in</button>
                </div>
            </form>

        </div>
        );
    }
}


