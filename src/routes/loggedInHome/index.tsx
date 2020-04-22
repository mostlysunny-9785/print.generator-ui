import {Component, h} from "preact";
import * as style from "./style.css";

export default class LoggedInHome extends Component<any, any> {
    constructor() {
        super();
        this.state = { value: "" };
    }

    onSubmit = (e: any) => {
        alert("Submitted a todo");
        e.preventDefault();
    };

    onInput = (e: any) => {
        const { value } = e.target;
        this.setState({ value });
    };

    render () {
        return (
            <div  class={style.home}>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.value} onInput={this.onInput} />
                    <p>You typed this value: {this.state.value}</p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}



