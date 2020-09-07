import {Component, h} from "preact";
import * as style from "../../../../components/menu/menuStyle.css";
import {route} from "preact-router";
import DropdownMenu from "../../../../components/dropdown";
import {useRef} from "preact/hooks";
import {ImageModel, ImagesService} from "../../../../components/utils/images.service";



interface Props {
    pictureFolderId: string,
    deleteEnabled: boolean,
    toggleDelete: () => void,
    newPictureUploaded: (newPictures: ImageModel[]) => void
}


export default class PictureFolderMenu extends Component<Props> {

    constructor(props: Props) {
        super(props);

    }


    private inputFile = useRef(null);
    private input: File = new File([], "", undefined);

    private addMenu = [
        {
            label: 'Upload image',
            action: () => {this.onButtonClick();}
        },
        {
            label: 'Paste link (URL, Are.na)',
            action: ()=>{route("/picture/" + this.props.pictureFolderId + "/add")}
        }
    ];

    onButtonClick = () => {
        // `current` points to the mounted file input element
        if (this.inputFile.current !== null){
            // @ts-ignore
            this.inputFile.current.click();
        }

    };

    handleChange = (e: any) => {
        if (e && e.target && e.target.files && e.target.files.length > 0){
            let fileList = e.target.files;
            ImagesService.uploadImages(fileList, this.props.pictureFolderId).then(value => {
                this.props.newPictureUploaded(value)
            });
        }


    }


    render(props?: preact.RenderableProps<any>, state?: Readonly<any>, context?: any): preact.ComponentChild {
            return (
                <div class={style.newMain}>
                        {/*<button type="submit" class={style.menuButton + ' ' + style.mainMenuButton} onClick={()=> {route("/home")}}>Modules</button>*/}

                        <div class={style.restButtons}>
                            <DropdownMenu label='Add' buttons={this.addMenu} horizontalPosition='CENTER' buttonStyling={style.menuButton}></DropdownMenu>
                            <button type="submit" class={style.menuButton + " " + (this.props.deleteEnabled ? "grayButton" : "wireButton")} onClick={this.props.toggleDelete}>Delete</button>
                            <button type="submit" class={style.menuButton + " wireButton"} onClick={()=>{route("/send")}}>Send</button>
                        </div>

                    <input type="file"
                           id="file"
                           ref={this.inputFile}
                           onChange={ (e: Event) => this.handleChange(e) }
                           style={{display: "none"}}
                           multiple
                    />

                </div>
            );
    }


};

