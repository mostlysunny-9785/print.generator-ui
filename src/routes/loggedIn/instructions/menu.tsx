import {Component, FunctionalComponent, h} from "preact";
import * as style from "../../../components/menu/menuStyle.css";
import {AuthorizationService} from "../../../services/authorization.service";
import {route} from "preact-router";




export default class InstructionsMenu extends Component<any, any> {

    private mailto: string;

    constructor() {
        super();
        const email = 'sample@gmail.com';
        const subject = 'Test';
        const emailBody = 'Hi Sample,';
        const attach = 'path';
        this.mailto ="mailto:" + email + "?subject=" + subject + "&body=" + emailBody +
            "?attach=" + attach
    }



    sendEmail = () => {

    }

    logOut = () => {
        AuthorizationService.signout().then(value => {route("/login")});
    }


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                    <div class={style.a} style={{fontSize: '15px', textDecoration: 'underline', flexDirection: 'column-reverse'}}>
                        <a href={this.mailto}>Email us (ask me anything)</a>
                        <span onClick={this.logOut} style={{cursor: 'pointer'}}>Log out (see you soon)</span>
                    </div>

                    <div class={style.c}>

                    </div>
                </div>
            );
    }


};

