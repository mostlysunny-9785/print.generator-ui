import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import HomeMenu from "./menu";

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
            <div>
                <div  class={style.home}>
                    <div class={style.box} onClick={()=>{route("/word")}}>
                        Word
                    </div>
                    <div class={style.box} onClick={()=>{route("/scrapper")}}>
                        Picture
                    </div>

                </div>
                {/*<div class={style.info}>*/}
                {/*    <p>*/}
                {/*        Name: Untitled 03*/}
                {/*    </p>*/}

                {/*    <p>*/}
                {/*    Type: Tshirt*/}
                {/*        <br />*/}
                {/*    Status: <span class="disabled">Empty</span>*/}
                {/*    </p>*/}
                {/*</div>*/}

                <HomeMenu></HomeMenu>
            </div>
        );
    }
}



