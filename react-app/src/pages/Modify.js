import {useLocation} from "react-router-dom"

const Modify = () => {
    let location = useLocation();

    return <div className="Modify">
        <h1>Modify Page</h1>
        <p>title:{location.state.title}</p>
        <p>contents:{location.state.contents}</p>
    </div>
}

export default Modify;