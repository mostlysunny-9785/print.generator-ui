import {Component, h} from "preact";
import * as style from "./style.css";

export default class Home extends Component<any, any> {
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
                <div class={style.box}>
                    Word
                </div>
                <div class={style.box}>
                    Picture
                </div>
            </div>
        );
    }
}



