import {Component, h} from "preact";
import * as menuStyle from "../../../../../components/menu/menuStyle.css";
import * as style from "./style.css";
import {UrlCheck, UrlTypes} from "../../../../../components/utils/urlCheck";
import {ImagesService} from "../../../../../components/utils/images.service";
import {route} from "preact-router";

interface State {
    errMsg: string;
}

interface Props {
    pictureFolderId: string
}

export default class PictureAdd extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {errMsg: "URL"};
    }

    private input = "";


    onSubmit = (e: Event) => {

        e.preventDefault();
        let urlTypes = UrlCheck(this.input);
        console.log(urlTypes);
        if (urlTypes === UrlTypes.NOT_VALID) {
            this.setState({errMsg: "Not valid URL"});
        } else {
            this.setState({errMsg: "URL"});

            if (urlTypes === UrlTypes.ARENA) {
                const parts = this.input.split("/");

                let arenaId = parts[parts.length-1];
                if (arenaId === "") {
                    arenaId = parts[parts.length-2];
                }

                console.log({arenaId});

                ImagesService.scrap(arenaId, this.props.pictureFolderId).then(value => {
                    if (value){
                        // channel scrapped so lets move back
                        route("/picture/" + this.props.pictureFolderId)
                    } else {
                        this.setState({errMsg: "Not valid URL"});
                    }
                });

            } else if (urlTypes === UrlTypes.IMAGE) {
                console.log("simple img");
                this.setState({errMsg: "Not valid URL"});
            }

            // todo: load and move back to pic
        }



    }

    onInput = (e: any) => {
        const {value} = e.target;
        this.input = value;
    }


    render () {

        return (
            <div>
                <div class={style.container}>
                    <div class={style.url}>
                        {this.state.errMsg}
                    </div>

                    <textarea
                        autofocus
                        class={style.text}
                        rows={6}
                        placeholder=""
                        value={this.input}
                        onInput={this.onInput}
                    />
                </div>
                <div class={menuStyle.newMain}>
                    <div class={menuStyle.restButtons}>
                        <button type="submit" class={menuStyle.menuButton + " grayButton"} onClick={this.onSubmit}>Send</button>
                    </div>
                </div>
            </div>


        );
    }
}



