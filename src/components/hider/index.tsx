import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface Props {
    headline: string;
    visible?: boolean;
    disabled?: boolean;
    children: any;
}

interface State {
    visible: boolean;
    disabled: boolean;
}

export default class Hider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let newState: State = { visible: false, disabled: false };
        if (props.visible) {
            newState.visible = true;
        }

        if (props.disabled) {
            newState.disabled = true;
        }

        this.state = newState;

    }

    toggleVisible = () => {
        if (!this.state.disabled) {
            this.setState({ visible: !this.state.visible });
        }
    };

    render() {

        const color = this.state.disabled ? '#A6A6A6': 'black';
        const headlineBorder: any = this.state.disabled || !this.state.visible ? {borderBottom: '0px'} : '';


        return (
            <div class={style.container} style={{color}}>
                <div class={style.headline} style={headlineBorder} onClick={this.toggleVisible}>
                    <div class={style.icon}>
                        {this.state.visible ? "▼" : "►"}{" "}
                    </div>
                    {this.props.headline}
                </div>
                {this.state.visible ? (
                    <div class={style.content}>{this.props.children}</div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
