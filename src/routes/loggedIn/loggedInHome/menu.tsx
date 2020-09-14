import {Component, h} from "preact";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import DropdownMenu from "../../../components/dropdown";
import {FolderType} from "../../../services/folders.service";


interface Props {
    onAdd: (type: FolderType) => void,
    onDelete: () => void
    canDelete: boolean
}



export default class HomeMenu extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    private addMenu = [
        {
            label: 'Picture',
            action: () => {this.props.onAdd(FolderType.IMAGE);}
        },
        {
            label: 'Word',
            action: () => {this.props.onAdd(FolderType.WORD);}
        }
    ];


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                        {/*<button type="submit" class={style.menuButton + ' ' + style.mainMenuButton} onClick={()=> {route("/home")}}>Modules</button>*/}

                        <div class={style.restButtons}>
                            <DropdownMenu label='Add' buttons={this.addMenu} horizontalPosition='CENTER' buttonStyling={style.menuButton}></DropdownMenu>
                            {/*<button type="submit" class={style.menuButton + " wireButton"}>Add</button>*/}
                            <button type="submit" class={style.menuButton + " " + (this.props.canDelete ? "grayButton" : "wireButton")}
                                    onClick={()=>{this.props.onDelete();}}>Delete</button>
                            <button type="submit" class={style.menuButton + " wireButton"} onClick={()=>{route('/send')}}>Send</button>
                        </div>
                </div>
            );
    }


};

