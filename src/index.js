import "./style/index.css";
import "./style/checkboxes.css";
import "./style/radios.css";
import App from "./components/app.tsx";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

configure({ adapter: new Adapter });

export default App;
