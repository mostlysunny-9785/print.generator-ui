import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import WordMenu from "./menu";

export default class Word extends Component<any, any> {
    constructor() {
        super();
        this.state = { text: "" };
    }

    private timer: any;

    private text = "Wake up, Neo...";
    private pointer: number = 0;


    componentDidMount() {
        this.pointer = 0;
        if (!this.timer) {
            this.timer = setInterval(() => {
                    if (this.pointer === this.text.length){
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                    if (this.text[this.pointer]){
                        this.setState({text: this.state.text + this.text[this.pointer]});
                    }

                    this.pointer++;

                }
            , 100)
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
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
            <div>
                <div class={style.editor}>
                    {this.state.text}
                </div>

                <WordMenu></WordMenu>
            </div>
        );
    }
}



