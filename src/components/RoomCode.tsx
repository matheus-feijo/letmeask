import react from "react";
import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";


type propsId={
    id:string
}


export function RoomCode(props:propsId){
    
    const handleCopyCode = () =>{
        navigator.clipboard.writeText(props.id);
    }
    
    return(
        <button className="code-room" onClick={handleCopyCode}>
            <div>
                <img src={copyImg} alt="copy-room"></img>
            </div>
            <span>Sala #{props.id}</span>
        </button>
    )
}