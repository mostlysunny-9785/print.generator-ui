import {Component, FunctionalComponent, h} from "preact";
import * as style from "../../../../components/header/style.css";
import * as menuStyle from "../../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import {isMobile} from "../../../../components/utils/screen";



interface Props {
    onRouterChange: () => void,
    wordCount: number
}

const WordFolderHeader: FunctionalComponent<Props> = (props: Props) => {

        return (
            <div class={style.main}>
                <div class={style.a}></div>
                <div class={style.b} onClick={()=>{route("/home")}}>
                    Word folder,
                    {isMobile() ? <br /> : ""}
                    {props.wordCount} words
                </div>
                <div class={style.c}>
                    <button type="submit" class={menuStyle.menuButton} onClick={()=>{
                        props.onRouterChange();
                        route("/home");
                    }}>Back</button>

                </div>
            </div>
        );


};


export default WordFolderHeader;
