import {Component, h} from "preact";
import * as style from "./style.css";
import {route} from "preact-router";
import HomeMenu from "./menu";
import DropdownMenu from "../../../components/dropdown";
import Navigation from "../../../components/navigation";
import {AuthorizationService} from "../../../services/authorization.service";

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
            <Navigation> </Navigation>

            <div>


                <div  class={style.home}>
                    <div class={style.box} onClick={()=>{route("/word/0")}}>
                        Word
                    </div>
                    <div class={style.box} onClick={()=>{route("/picture/0")}}>
                        Picture
                    </div>

                </div>

                <a onClick={() => {AuthorizationService.signout().then(value => {route("/login")})}}>Logout</a>

                <HomeMenu></HomeMenu>
            </div>
            </div>
        );
    }
}



