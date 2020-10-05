import { Component, h } from "preact";
import * as style from "./style.css";
import { route } from "preact-router";
import HomeMenu from "./menu";
import Navigation from "../../../components/navigation";
import { AuthorizationService } from "../../../services/authorization.service";
import {
    FolderModel,
    FoldersService,
    FolderType
} from "../../../services/folders.service";
import DeleteButton from "../../../components/deleteButton/deleteButton";

interface State {
    folders: FolderModel[];
    canDelete: boolean;
}

export default class LoggedInHome extends Component<any, State> {
    constructor() {
        super();
        this.state = { canDelete: false, folders: [] };
    }

    componentDidMount() {
        FoldersService.get().then((folders: FolderModel[]) => {
            this.setState({ folders });
            console.log({ folders });
        });
    }

    onDelete = () => {
        this.setState({ canDelete: !this.state.canDelete });
    };

    onAdd = (type: FolderType) => {
        let highestNumber = 0;
        if (this.state.folders) {
            this.state.folders.forEach((folder: FolderModel) => {
                if (folder.type === type) {
                    // is the right type
                    if (highestNumber < folder.id) {
                        highestNumber = folder.id;
                    }
                }
            });
        }

        highestNumber++; // make it by one bigger
        FoldersService.add(highestNumber.toString(), type).then(
            (newFolder: any) => {
                if (newFolder.type === "0") {
                    newFolder.type = FolderType.WORD;
                } else if (newFolder.type === "1") {
                    newFolder.type = FolderType.IMAGE;
                }
                this.setState({ folders: [...this.state.folders, newFolder] });
            }
        );
    };

    routeTo = (path: string) => {
        if (!this.state.canDelete) {
            // only route if delete is not enabled
            route(path);
        }
    };

    onDeleteClick = (id: string) => {
        console.log({ id });
        FoldersService.delete(id).then(result => {
            if (result) {
                const findIndex = this.state.folders.findIndex(
                    folderToFind => folderToFind._id === id
                );
                const folders = this.state.folders;
                folders.splice(findIndex, 1);
                this.setState({ folders });
            }
        });
    };

    render() {
        let folders: any = [];
        if (this.state.folders) {
            this.state.folders.forEach((folder: FolderModel) => {
                let folderElm: any;
                if (folder.type === FolderType.WORD) {
                    folderElm = (
                        <div
                            class={style.box}
                            onClick={() => {
                                this.routeTo("/word/" + folder.id);
                            }}
                        >
                            {this.state.canDelete ? (
                                <DeleteButton
                                    delete={() => {
                                        this.onDeleteClick(folder._id);
                                    }}
                                />
                            ) : (
                                ""
                            )}
                            Word {folder.id !== 1 ? folder.id : ""}
                        </div>
                    );
                } else if (folder.type === FolderType.IMAGE) {
                    folderElm = (
                        <div
                            class={style.box}
                            onClick={() => {
                                this.routeTo("/picture/" + folder.id);
                            }}
                        >
                            {this.state.canDelete ? (
                                <DeleteButton
                                    delete={() => {
                                        this.onDeleteClick(folder._id);
                                    }}
                                />
                            ) : (
                                ""
                            )}
                            Picture {folder.id !== 1 ? folder.id : ""}
                        </div>
                    );
                } else {
                    folderElm = <div class={style.box}>ERROR</div>;
                }
                folders.push(folderElm);
            });
        }

        // wrap every folder with wrapper for propper 50%
        folders = folders.map((folder: any) => <div class={style.boxWrapper}>{folder}</div>)


        return (
            <div>
                <Navigation> </Navigation>

                <div>
                    <div class={style.home}>{folders}</div>

                    <HomeMenu
                        onAdd={this.onAdd}
                        onDelete={this.onDelete}
                        canDelete={this.state.canDelete}
                    >
                        {" "}
                    </HomeMenu>
                </div>
                <div class="footerSpacer"> </div>
            </div>
        );
    }
}
