import {Component, h} from "preact";
import * as style from "../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import DropdownMenu from "../../../components/dropdown";



export default class HomeMenu extends Component<any, any> {

    private addMenu = [
        {
            label: 'Picture',
            action: () => {console.log('Adding pic')}
        },
        {
            label: 'Word',
            action: () => {console.log('Addin Word')}
        }
    ];


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                        {/*<button type="submit" class={style.menuButton + ' ' + style.mainMenuButton} onClick={()=> {route("/home")}}>Modules</button>*/}

                        <div class={style.restButtons}>
                            <DropdownMenu label='Add' buttons={this.addMenu} horizontalPosition='CENTER' buttonStyling={style.menuButton}></DropdownMenu>
                            {/*<button type="submit" class={style.menuButton + " wireButton"}>Add</button>*/}
                            <button type="submit" class={style.menuButton + " wireButton"}>Delete</button>
                            <button type="submit" class={style.menuButton + " wireButton"} onClick={()=>{route('/send')}}>Send</button>
                        </div>
                </div>
            );
    }


};

