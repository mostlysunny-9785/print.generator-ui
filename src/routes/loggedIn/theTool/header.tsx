import {Component, FunctionalComponent, h} from "preact";
import * as style from "../../../components/header/style.css";
import * as menuStyle from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";



interface Props {

}

const SendHeader: FunctionalComponent<Props> = (props: Props) => {

    return (
        <div class={style.main}>
            <div class={style.a}> </div>
            <div class={style.b} onClick={()=>{route("/home")}}>
                Anonymous #12354, thanks for trying the beta version ✨
            </div>
            <div class={style.c}>
                <button type="submit" class={menuStyle.menuButton} onClick={()=>{route("/home")}}>Back</button>

            </div>
        </div>
    );


};


export default SendHeader;
