
import {useNavigate} from "react-router-dom"

export default function BackHome(){
    const navigate = useNavigate();
    const backhandler = () =>{
        navigate("/");
    }
    return <button onClick={backhandler}>Go Back to Home</button>
}