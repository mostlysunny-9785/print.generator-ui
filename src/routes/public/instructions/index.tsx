import {Component, h} from "preact";
import * as style from "./style.css";
import InstructionsMenu from "./menu";
import Navigation from "../../../components/navigation";
import Hider from "../../../components/hider";

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
                            {basic}
                        </div>
                    </Hider>

                    <Hider headline='Content format support'>
                        <div class={style.textBlock}>
                            {content}
                        </div>
                    </Hider>

                    <Hider headline='Methods'>
                    </Hider>

                    <Hider headline='Archive'>
                    </Hider>


                    <InstructionsMenu />
                </div>
            </div>
        );
    }
}



