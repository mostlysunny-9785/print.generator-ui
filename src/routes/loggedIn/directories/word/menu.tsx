import {Component, h} from "preact";
import * as style from "../../../../components/menu/menuStyle.css";
import {route} from "preact-router";


interface Props {
    onRouterChange: () => void
}



export default class WordFolderMenu extends Component<Props> {

    constructor(props: Props) {
        super(props);

    }



    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                        <div class={style.restButtons}>
                            <button type="submit" class={style.menuButton + " wireButton"} onClick={()=>{
                                this.props.onRouterChange();
                                route("/send");

                            }}>Send</button>
                        </div>
                </div>
            );
    }


};

