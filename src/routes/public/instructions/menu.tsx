import {Component, FunctionalComponent, h} from "preact";
import * as style from "../../../components/menu/menuStyle.css";




export default class InstructionsMenu extends Component<any, any> {


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.main}>
                    <div class={style.a} style={{fontSize: '15px', textDecoration: 'underline'}}>
                        Email us (ask me anything) <br />
                        Log out (see you soon)
                    </div>

                    <div class={style.c}>

                    </div>
                </div>
            );
    }


};

