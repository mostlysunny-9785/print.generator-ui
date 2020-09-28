import {Component, FunctionalComponent, h} from "preact";
import { Link } from "preact-router/match";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import {GeneratedModel, ToolService} from "../../../services/tool.service";
import {apiUrlPrefix} from "../../../components/utils/global";
import { saveAs } from 'file-saver';


export default class TheToolMenu extends Component<any, any> {

    download = () => {
        const svgElement: any = document.getElementById("drawArea");
        const serializedSvg = new XMLSerializer().serializeToString(svgElement);
        const base64 = window.btoa(unescape(encodeURIComponent(serializedSvg)));
        ToolService.add(base64).then((generatedModel: GeneratedModel) => {

            console.log({generatedModel});
            // let a = document.createElement('a')
            // a.href = apiUrlPrefix + generatedModel.filename;
            // a.download = generatedModel.id + ".png";
            // document.body.appendChild(a)
            // a.click()
            // document.body.removeChild(a)

            saveAs(apiUrlPrefix + generatedModel.filename, generatedModel.id + ".png");

        });


    }

    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.main}>
                    <div class={style.a}>
                        <button type="submit" class={style.menuButton} onClick={()=> {route("/home")}}>Back to home</button>
                        <button type="submit" class={style.menuButton + " wireButton"} onClick={this.download}>Save & download</button>
                    </div>
                </div>
            );
    }


};

