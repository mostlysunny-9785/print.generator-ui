import {Component, FunctionalComponent, h} from "preact";
import * as style from "../../../components/header/style.css";
import * as menuStyle from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import {store} from "../../../model/store";
import {anonymousPrefix} from "../../../components/utils/global";



interface Props {

}

const SendHeader: FunctionalComponent<Props> = (props: Props) => {

    const userId = anonymousPrefix + store.getState().guestReducer.id;

    return (
        <div class={style.main}>
            <div class={style.a} style={{width: "123px"}}> </div>
            <div class={style.b}>
                {userId}, thanks for trying the beta version ✨
            </div>
            <div class={style.c}>
                <button type="submit" class={menuStyle.menuButton} onClick={()=>{route("/home")}}>Back</button>

            </div>
        </div>
    );


};


export default SendHeader;
