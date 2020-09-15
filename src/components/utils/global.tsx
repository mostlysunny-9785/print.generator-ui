import {Component, h} from "preact";


export var hasTheirOwnHeader = ['/instructions', '/picture', '/home', '/settings', '/instructions', '/word', '/', '/login'];

export var hasGotTheirOwnMenu = [];
export var publicRoutes = ["/login"];

export var apiUrlPrefix = "/api/";





export class PrettyPrintJson extends Component<any, any> {
    render() {
        return (<div><pre>{JSON.stringify(this.props.data, null, 2) }</pre></div>);
    }
}
