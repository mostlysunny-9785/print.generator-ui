import {Component, h} from "preact";
import * as style from "./style.css";
import {CompositionStrategies, CompositionTypes, GenerationModel, TShirtColors, TShirtTypes} from "../generationModel";
import Hider from "../../../../components/hider";

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

    generateOptionsFromEnum(enm: string[], modelParameter: string): any {
        let enumResult: any = [];
        enm.forEach((type: string, index: number) => [
            enumResult.push(
                <label class="radioContainer" style={{marginRight: '10px'}}>{type}
                    <input type="radio"
                           name={modelParameter}
                           value={type}
                           checked={index === (this.props.model as any)[modelParameter].valueOf()}
                           onChange={(event) => {this.props.modelChange((event.target as any).name, index)}}
                    />
                    <span class="radioCheckmark"></span>
                </label>)
        ])
        return enumResult;
    }


    render () {

        // let debugCheckboxes: any = [];
        // booleans.forEach(paramName => {
        //     debugCheckboxes.push(<label class="checkboxContainer">{paramName}
        //         <input type="checkbox"
        //                name={paramName}
        //                checked={(this.props.model as any)[paramName]}
        //                onChange={this.handleInputChange}
        //         />
        //
        //         <span class="checkmark"></span>
        //     </label>)
        // })

        // const compositionTypes = this.generateOptionsFromEnum(Object.keys(CompositionTypes).filter(k => typeof CompositionTypes[k as any] === "number"), "composition");
        const tShirtTypes = this.generateOptionsFromEnum(Object.keys(TShirtTypes).filter(k => typeof TShirtTypes[k as any] === "number"), "tShirtType");
        const tShirtColor = this.generateOptionsFromEnum(Object.keys(TShirtColors).filter(k => typeof TShirtColors[k as any] === "number"), "tShirtColor");
        // const compositionStrategy = this.generateOptionsFromEnum(Object.keys(CompositionStrategies).filter(k => typeof CompositionStrategies[k as any] === "number"), "compositionStrategy");

        return (
            <div class={style.container}>

                <Hider headline="Medium" visible={true}>
                    <div class={style.caption}>TShirtTypes:</div> {tShirtTypes}
                    <div class={style.caption}>tShirtColor:</div> {tShirtColor}
                    <div>
                        <div class={style.caption} style={{fontSize: '20px'}}>WxH:</div>
                        <input style={{fontSize: '20px', width: '15px !important', padding: 0}} type="text" value={this.props.model.canvasWidth} onChange={(event: any) => {this.props.modelChange('canvasWidth', parseInt(event.target.value))}} />
                        x
                        <input style={{fontSize: '20px', width: '15px !important', padding: 0}} type="text" value={this.props.model.canvasHeight} onChange={(event: any) => {this.props.modelChange('canvasHeight', parseInt(event.target.value))}} />
                    </div>
                </Hider>
            </div>
        );
    }
}



