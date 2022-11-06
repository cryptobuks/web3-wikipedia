import {useLocation} from "react-router-dom"
import store from "../store"
import Header from "../components/Header";
import '../components/css/font.css'
import PageTitle from "../components/PageTitle";

const Modify = () => {
    let location = useLocation();

    return <div className="Modify">
        <h1>Modify Page</h1>
        <p>title:{location.state.title}</p>
        <p>contents:{location.state.contents}</p>
        <p>{store.getState().setter.word}</p>
    </div>
}

export default Modify;