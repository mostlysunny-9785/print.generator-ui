import {Component, h} from "preact";
import * as style from "./style.css";
import {
    CompositionStrategies,
    CompositionTypes,
    GenerationModel,
    PrintColors,
    TShirtColors,
    TShirtTypes
} from "../generationModel";
import Hider from "../../../../components/hider";
import {store} from "../../../../model/store";
import {SettingsService} from "../../../../services/settings.service";
import {userActionUpdateSettings} from "../../../../model/user_reducer_actions";

interface Props {
    model: GenerationModel,
    modelChange: (key: string, value: any) => void
}


const booleans = ['drawAreaVisible',  'lotNumbers', 'qrCode']

export default class UserModelPicker extends Component<Props, Props> {
    constructor(props: Props) {
        super(props);
        this.state = props;
    }


    handleInputChange = (event: any) => {
        const target = event.target;
        const name = target.name;

        const value = booleans.includes(target.name) ? target.checked : target.value;
        //
        console.log({value});
        this.props.modelChange(name, value);

        // this.props.model[name]
        // this.setState({
        //     [name]: value
        // });
    }


    changeTshirtColor = (event: any) => {
        const newColor: TShirtColors = event.target.value === TShirtColors.DARK.toString() ? TShirtColors.DARK : TShirtColors.LIGHT; // TODO: well...
        this.props.modelChange('tShirtColor', newColor);
        this.setState({model: {
            ...this.state.model,
            tShirtColor: newColor
        }});
    }

    changePrintColor = (event: any) => {
        const newColor: PrintColors = event.target.value === PrintColors.COLORFULL.toString() ? PrintColors.COLORFULL : PrintColors.BW; // TODO: well...
        this.props.modelChange('printColor', newColor);
        this.setState({model: {
                ...this.state.model,
                printColor: newColor
            }});
    }

    changeComposition = (event: any) => {
        const composition: CompositionTypes = event.target.value === CompositionTypes.RANDOM.toString() ? CompositionTypes.RANDOM : CompositionTypes.GRID; // TODO: well...
        this.props.modelChange('composition', composition);
        this.setState({model: {
                ...this.state.model,
                composition: composition
            }});

    }


    render () {

        return <div>

        <Hider headline={'Medium'} visible={true}>
            <div class={style.settingsLine}>
                <div class={style.settingsElem}> Specification #1: </div>
                <select class={style.input + " " + style.settingsElem}
                        onChange={this.changeTshirtColor}>
                    <option value={TShirtColors.LIGHT} selected={this.state.model.tShirtColor === TShirtColors.LIGHT}>White</option>
                    <option value={TShirtColors.DARK} selected={this.state.model.tShirtColor === TShirtColors.DARK}>Black</option>
                </select>
                <div class={style.settingsElemBig} style={{color: '#A6A6A6'}}> </div>
            </div>

        </Hider>

        <Hider headline={'Print'} visible={true}>
            <div class={style.settingsLine}>
                <div class={style.settingsElem}> Color: </div>

                <select class={style.input + " " + style.settingsElem} onChange={this.changePrintColor}>
                    <option value={PrintColors.COLORFULL} selected={this.state.model.printColor === PrintColors.COLORFULL}>Colorful picture</option>
                    <option value={PrintColors.BW} selected={this.state.model.printColor === PrintColors.BW}>Black and white picture</option>
                </select>

                <input
                    type="text"
                    value={this.state.model.tShirtColor === TShirtColors.DARK ? "White text" : "Dark text"}
                    class={style.input + " " + style.settingsElem}
                    style={{color: "#A6A6A6"}}
                    disabled
                />
                <div class={style.settingsElem}> </div>
            </div>
            <div class={style.settingsLine}>
                <div class={style.settingsElem}> Composition: </div>
                <div class={style.settingsElemBig}>
                    <label class={"radioContainer " + style.radio }>Grid
                        <input type="radio"
                               value={CompositionTypes.GRID}
                               onChange={this.changeComposition}
                               checked={this.state.model.composition === CompositionTypes.GRID}
                        />
                        <span class="radioCheckmark"> </span>
                    </label>
                    <label class={"radioContainer " + style.radio }>Random
                        <input type="radio"
                               value={CompositionTypes.RANDOM}
                               onChange={this.changeComposition}
                               checked={this.state.model.composition === CompositionTypes.RANDOM}
                        />
                        <span class="radioCheckmark"> </span>
                    </label>
                </div>
                <div class={style.settingsElem} style={{color: '#A6A6A6'}}> </div>
            </div>
            <div class={style.settingsLine} style={{marginBottom: "0px"}}>
                <div class={style.settingsElem}> Canvas: </div>
                <input
                    type="text"
                    value={"A3"}
                    class={style.input + " " + style.settingsElem}
                    style={{color: "#A6A6A6"}}
                    disabled
                />

                <div class={style.settingsElemBig}> </div>
            </div>
        </Hider>
        </div>
    }
}



