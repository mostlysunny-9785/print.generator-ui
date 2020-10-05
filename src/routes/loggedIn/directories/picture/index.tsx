import {Component, h} from "preact";
import PictureFolderMenu from "./menu";
import {ChanelModel, ImageModel, ImagesService} from "../../../../services/images.service";
import {ScrapperChanel} from "../../scrapper/chanel";
import {Image} from "./image";
import * as style from "./style.css";
import PictureFolderHeader from "./header";

interface State {
    channels: ChanelModel[],
    images: ImageModel[],
    imagesComponents: any[],
    deleteEnabled: boolean
}

interface Props {
    id: string
}

export default class PictureFolder extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { channels: [], images: [], deleteEnabled: false, imagesComponents: [] };
    }

    componentDidMount(): void {
        ImagesService.loadFolder(this.props.id).then((images: ImageModel[]) => {
            this.setState({images});

        });
    }

    toggleDelete = () => {
        this.setState({ deleteEnabled: !this.state.deleteEnabled});
    }

    onRemoval = (imageToDelete: ImageModel) => {
        ImagesService.removeImage(imageToDelete._id, this.props.id).then(value => {
            console.log({value});
            if (value) {
                const findIndex = this.state.images.findIndex(imageToFind => imageToFind._id === imageToDelete._id);
                const images = this.state.images;
                images.splice(findIndex, 1);
                this.setState({images});
            }
        })
    }

    newPictureUploaded = (uploadedPictures: ImageModel[]) => {
        console.log({uploadedPictures});
        this.setState({images: [...uploadedPictures, ...this.state.images]});
    }



    render () {
        const images: any = [];
        this.state.images.forEach(image => {
            images.push(<Image
                key={image._id}
                image={image}
                canDelete={this.state.deleteEnabled}
                onRemoval={() => {this.onRemoval(image)}}></Image>)
        });

        return (
            <div>

                <PictureFolderHeader folderId={this.props.id} pictures={this.state.images.length}></PictureFolderHeader>

                <div class={style.imageContainerWrapper}>
                    <div class={style.imageContainer}>
                        {images}
                        <div class="footerSpacer"> </div>
                    </div>


                </div>


                <PictureFolderMenu
                    pictureFolderId={this.props.id}
                    toggleDelete={this.toggleDelete}
                    deleteEnabled={this.state.deleteEnabled}
                newPictureUploaded={this.newPictureUploaded}></PictureFolderMenu>


            </div>
        );
    }
}



