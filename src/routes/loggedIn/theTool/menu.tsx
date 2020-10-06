import {Component, h} from "preact";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import {GeneratedModel, ToolService} from "../../../services/tool.service";
import {apiUrlPrefix} from "../../../components/utils/global";
import {saveAs} from 'file-saver';
import {FolderModel, FoldersService, FolderType} from "../../../services/folders.service";


interface Props {
    isRandom: boolean;
    regenerate: () => void;
}

export default class TheToolMenu extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }


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

    regenerate = () => {
        this.props.regenerate();
    }

    startAgain = () => {
        // remove all folders
        FoldersService.get().then((folders: FolderModel[]) => {
            const removePromises: Promise<boolean>[] = [];
            folders.forEach((folder: FolderModel) => {
                removePromises.push(FoldersService.delete(folder._id));
            });

            Promise.all(removePromises).then((allright: boolean[]) => {
                // everything should be removed... create new one
                const addPromises: Promise<FolderModel>[] = [];
                addPromises.push(FoldersService.add("1", FolderType.IMAGE));
                addPromises.push(FoldersService.add("1", FolderType.WORD));
                Promise.all(addPromises).then((newFolders: FolderModel[]) => {
                    route("/home");
                });
            });
        })
    }


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
        return (
            <div class={style.newMain} style={{overflowX: "scroll"}}>
                <div class={style.a}>
                    <button type="submit" class={style.menuButton} onClick={this.startAgain}>Start again</button>

                    {this.props.isRandom ? <button type="submit" class={style.menuButton + " wireButton"} onClick={this.regenerate}>Generate</button> : ""}


                    <button type="submit" class={style.menuButton + " wireButton"} onClick={this.download}>Download PNG</button>
                </div>
            </div>
        );
    }


};

