import {Component, h} from "preact";
import * as style from "./style.css";
import InstructionsMenu from "./menu";
import Navigation from "../../../components/navigation";
import Hider from "../../../components/hider";
import Archive from "../archive";

export default class Instructions extends Component<any, any> {
    constructor() {
        super();
        this.state = { value: "" };
    }

    onSubmit = (e: any) => {
        alert("Submitted a todo");
        e.preventDefault();
    };

    onInput = (e: any) => {
        const { value } = e.target;
        this.setState({ value });
    };

    render () {
        var basic = 'This tool is used to modify the supplied content by the user, who himself sets the specific medium and the basic parameters of the resulting modification✨\n' +
            '\n' +
            'The application is divided into three categories:\n' +
            '1. Modules (`Word` and `Picture` modules are available at the moment)\n' +
            '2. Settings (currently for `Medium` and `Print`)\n' +
            '3. Instractions (where you are currently located)\n' +
            '\n' +
            'Before sending data:\n' +
            '1. Add or Delete folders in Modules (one folder is the minimum)*\n' +
            '2. Upload your contents to folders\n' +
            '3. Fill the basic parametres in Settings\n' +
            '4. Send the contents using the “Send button” to the tool\n' +
            '\n' +
            'After sending the data:\n' +
            '1. download the result of the tool\n' +
            '2. use it as you see fit**\n' +
            '\n' +
            '* The type, number, order of Folders and Text formatting have an effect on the final editing of the content\n' +
            '** for now only the running medium “Tshirt”  is delivered to ensure production in any local Copy Center / Print Studio by your own\n' +
            '\n' +
            'Have fun 🎮';

        const content = 'Word module:\n' +
            '1. in the `Word` folder you can write text in a wide range of languages ​​or upload links (these are displayed as QR codes in the result)\n' +
            '2. the tool respects text formatting\n' +
            '3. currently only text division using the “Enter” key is available)\n' +
            '\n' +
            'Picture module:\n' +
            '1. You can upload JPEG, PNG, PDF files to the `Picture` folder. and TIFF.\n' +
            '2. maximum file size ??? MB\n' +
            '3. the recommended image resolution is 300 dpi\n' +
            '4. if the resolution is lower, the tool will automatically use the program to improve the image resolution\n' +
            '    \n' +
            'Curator mode:\n' +
            '1. the maximum number of characters in the Word folder is ??? characters\n' +
            '2. the maximum number of files in the Picture folder is ??? files\n' +
            '3. after exceeding these limits, the tool automatically starts the curator mode, which randomly selects as many words / files as possible from the uploaded content, which it can edit respects';
        return (

            <div>
                <Navigation />
                <div>


                    <Hider headline='Basic instrucitons'>
                        <div class={style.textBlock}>
                            <p>
                            This tool is used to modify the user's supplied content, who himself sets the specific medium and the basic parameters of the resulting modification✨
                            </p>

                            <p>
                            The application is divided into three categories:
                                <ol>
                                    <li>Modules (Word and Picture modules are available at the moment)</li>
                                    <li>Settings (currently for Medium and Print)</li>
                                    <li>Instructions (where you are currently located)</li>
                                </ol>
                            </p>

                            <p>
                                Before sending data:
                                <ol>
                                    <li>add or delete folders in the Folders module (one folder is the minimum)*</li>
                                    <li>upload your contents to folders</li>
                                    <li>fill the necessary parameters in the Settings module</li>
                                    <li>send the contents using the "Send" button to the Tool</li>
                                </ol>
                            </p>

                            <p>
                                After sending the data:
                                <ol>
                                    <li>download the result of the Tool</li>
                                    <li>use it as you see fit**</li>
                                </ol>
                            </p>

                            <p>*The type, number, order of Folders and Text formatting have an effect on the final editing of the content</p>
                            <p>**For now, only the running medium "Tshirt" is delivered to ensure production in any local Copy Center / Print Studio by your own</p>

                        </div>
                    </Hider>

                    <Hider headline='Content format support'>
                        <div class={style.textBlock}>
                            <p>
                            Word module:
                                <ol>
                                    <li>in the Word folder, you can write text in a wide range of languages or upload links (these are displayed as QR codes in the result)</li>
                                    <li>the Tool respects text formatting</li>
                                    <li>currently, only text division using the "Enter" key is available</li>
                                </ol>
                            </p>

                            <p>
                            Picture module:
                                <ol>
                                    <li>in the Picture folder, you can upload JPEG, PNG and GIF files</li>
                                    <li>maximum file size is ??? MB</li>
                                    <li>the recommended image resolution is 300 dpi</li>
                                    <li>if the resolution is lower, the Tool will automatically use the program to improve the image resolution</li>
                                </ol>
                            </p>

                            <p>
                            Curator mode:
                                <ol>
                                    <li>the maximum number of characters in the Word folder is ??? characters</li>
                                    <li>the maximum number of files in the Picture folder is ??? files</li>
                                    <li>after exceeding these limits, the Tool automatically starts the Curator mode, which randomly selects as many words/files as possible from the uploaded content, which it can edit respects</li>
                                </ol>
                            </p>

                            <p>
                            Reporting status/problems in the Folders module:
                                <ol>
                                    <li>🔴 == everything looks good</li>
                                    <li>🔴 == too much content == content will be edited</li>
                                </ol>

                            </p>
                        </div>
                    </Hider>

                    <Hider headline='Methods'>
                        <p>
                            Content editing methods consist of rules and strategies that shape the final layout.
                        </p>
                        <p>
                            These parameters are a comprehensive system of rules and micro tools that aim for the most consistent results.
                        </p>
                        <p>
                        It is basically divided into:
                            <ol>
                                <li>compositional rules<ul>
                                    <li>they are divided into two basic types of compositions:<ol>
                                        <li>grid mode<ul><li>the Tool adjusts the content to a strict cross under clearly defined rules</li></ul></li>
                                        <li>random mode<ul><li>the Tool changes the content randomly / freely according to less constrained rules</li></ul></li>
                                    </ol></li>
                                </ul></li>
                                <li>compositional strategies<ul>
                                    <li>it is about different folding options based on the preset composition</li>
                                    <li>composition strategies include, for example:<ol>
                                        <li>golden ratio</li>
                                        <li>absolute randomness (totally random)</li>
                                        <li>prohibition to enlarge original image size (Do not resize) etc.</li>
                                    </ol></li>
                                </ul></li>
                            </ol>
                        </p>

                        <p>
                            All parameters are created by an intuitive method*, created through a discussion between the designer and the encoder.**
                        </p>

                        <p>
                            *One of the future visions about this intuitive method (too personal/individual) is transforming it into datasets, a technique that "derived" ideal types of layouts "live" using artificial intelligence technology.
                        </p>

                        <p>
                            **Both actors use knowledge from their field and then, by consensus, implement it for the final decision
                        </p>
                    </Hider>

                    <Hider headline='Archive'>
                        <Archive />
                    </Hider>


                    <InstructionsMenu />
                </div>
            </div>
        );
    }
}



