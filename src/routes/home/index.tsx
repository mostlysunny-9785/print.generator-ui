import {Component, h} from "preact";
import * as style from "./style.css";

export default class Home extends Component<any, any> {
    constructor() {
        super();
        this.state = { value: "" };
    }


    render () {
        return (
            <div  class={style.home}>
                ✈
            </div>
        );
    }
}



