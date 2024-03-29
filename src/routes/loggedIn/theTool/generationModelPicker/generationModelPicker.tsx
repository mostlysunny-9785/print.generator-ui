import {Component, h} from "preact";
import * as style from "./style.css";
import {CompositionStrategies, CompositionTypes, GenerationModel, TShirtColors, TShirtTypes} from "../generationModel";
import Hider from "../../../../components/hider";
import {store} from "../../../../model/store";
import {setGenerationAction} from "../../../../model/generation_reducer_actions";

interface GenerationModelPickerProps {
    model: GenerationModel,
    modelChange: (key: string, value: any) => void
}

const booleans = ['drawAreaVisible',  'lotNumbers', 'qrCode']

export default class GenerationModelPicker extends Component<GenerationModelPickerProps, GenerationModelPickerProps> {
    constructor(props: GenerationModelPickerProps) {
        super(props);
        this.state = props;
    }


    handleInputChange = (event: any) => {
        const target = event.target;
        const name = target.name;

        const value = booleans.includes(target.name) ? target.checked : target.value;

        console.log({value});
        this.props.modelChange(name, value);
        // const generationReducer = store.getState().generationReducer;
        //
        // store.dispatch(setGenerationAction());

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


    generate = () => {
        this.props.modelChange('generate', true);
    }


    render () {

        let debugCheckboxes: any = [];
        booleans.forEach(paramName => {
                debugCheckboxes.push(<label class="checkboxContainer">{paramName}
                    <input type="checkbox"
                           name={paramName}
                           checked={(this.props.model as any)[paramName]}
                           onChange={this.handleInputChange}
                    />

                    <span class="checkmark"></span>
                </label>)
        })

        const compositionTypes = this.generateOptionsFromEnum(Object.keys(CompositionTypes).filter(k => typeof CompositionTypes[k as any] === "number"), "composition");
        // const tShirtTypes = this.generateOptionsFromEnum(Object.keys(TShirtTypes).filter(k => typeof TShirtTypes[k as any] === "number"), "tShirtType");
        // const tShirtColor = this.generateOptionsFromEnum(Object.keys(TShirtColors).filter(k => typeof TShirtColors[k as any] === "number"), "tShirtColor");
        // const compositionStrategy = this.generateOptionsFromEnum(Object.keys(CompositionStrategies).filter(k => typeof CompositionStrategies[k as any] === "number"), "compositionStrategy");

        return (
            <div>
                <Hider headline="DEBUG" visible={true}>
                    DEBUG:
                    {debugCheckboxes}
                    {/*<div class={style.caption}>Composition strategy:</div>*/}
                    {/*<div class={style.option}>*/}
                    {/*    {compositionStrategy}*/}
                    {/*</div>*/}
                </Hider>

                <Hider headline="Composition" visible={true}>


                    <div class={style.settingsLine} style={{marginBottom: "0px"}}>
                        <div class={style.settingsElem}> Picture Count: </div>
                        <input
                            type="text"
                            class={style.input + " " + style.settingsElem}
                            value={this.props.model.picturesCount}
                            onChange={(event: any) => {this.props.modelChange('picturesCount', parseInt(event.target.value))}}
                        />

                        <div class={style.settingsElemBig}> </div>
                    </div>

                    <div class={style.settingsLine} style={{marginBottom: "0px"}}>
                        <div class={style.settingsElem}> Word count: </div>
                        <input
                            type="text"
                            class={style.input + " " + style.settingsElem}
                            value={this.props.model.wordsCount}
                            onChange={(event: any) => {this.props.modelChange('wordsCount', parseInt(event.target.value))}}
                        />

                        <div class={style.settingsElemBig}> </div>
                    </div>

                    {/*<div style={{display: 'flex'}}>*/}
                    {/*    <div class={style.caption} style={{fontSize: '20px'}}>columnsCount:</div>*/}
                    {/*    <input style={{fontSize: '20px'}} type="text" value={this.props.model.columnsCount} onChange={(event: any) => {this.props.modelChange('columnsCount', event.target.value)}} />*/}
                    {/*</div>                */}
                </Hider>

                <button onClick={this.generate}>
                    GENERATE
                </button>
            </div>
        );
    }
}



