import {Component, h} from "preact";
import PictureFolderMenu from "./menu";
import {ChanelModel, ImageModel, ImagesService} from "../../../../components/utils/images.service";
import {ScrapperChanel} from "../../scrapper/chanel";
import {Image} from "./image";
import * as style from "./style.css";

interface State {
    channels: ChanelModel[],
    images: ImageModel[],
    deleteEnabled: boolean
}

interface Props {
    id: string
}

export default class PictureFolder extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { channels: [], images: [], deleteEnabled: false };
    }

    componentDidMount(): void {
        // ImagesService.loadChannels().then(channels => {
        //     this.setState({ channels: channels }, () => {
        //         this.lazyLoadImages();
        //     });
        //
        // });

        ImagesService.loadFolder(this.props.id).then((images: ImageModel[]) => {
            this.setState({images});
        });

        // TODO: load user picures
    }

    lazyLoadImages(): void {
        this.state.channels.forEach((channel) => {
            ImagesService.loadChannelImages(channel._id).then(value => {
                this.setState({ images: this.state.images.concat(value) });
            });
        })
    }

    toggleDelete = () => {
        this.setState({ deleteEnabled: !this.state.deleteEnabled});
    }


    render () {
        const images: any = [];
        this.state.images.forEach(image => {
            images.push(<Image image={image} canDelete={this.state.deleteEnabled}></Image>)
        });


        return (
            <div>
                <div class={style.imageContainer}>
                    {images}
                </div>


                <PictureFolderMenu pictureFolderId={this.props.id} toggleDelete={this.toggleDelete} deleteEnabled={this.state.deleteEnabled}></PictureFolderMenu>
            </div>
        );
    }
}



