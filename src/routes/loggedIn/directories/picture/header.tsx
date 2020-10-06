import {Component, FunctionalComponent, h} from "preact";
import * as style from "../../../../components/header/style.css";
import * as menuStyle from "../../../../components/menu/menuStyle.css";
import {route} from "preact-router";



interface Props {
    folderId: string;
    pictures: number;
    returnToFolder?: boolean;
}

const PictureFolderHeader: FunctionalComponent<Props> = (props: Props) => {

        return (
            <div class={style.main}>
                <div class={style.a}> </div>
                <div class={style.b} onClick={()=>{route("/home")}}>
                    Picture folder, {props.pictures} files
                </div>
                <div class={style.c}>
                    <button type="submit" class={menuStyle.menuButton} onClick={()=>{
                        if (props.returnToFolder) {
                            route("/picture/" + props.folderId);
                        } else {
                            route("/home");
                        }

                    }}>Back</button>

                </div>
            </div>
        );


};


export default PictureFolderHeader;
