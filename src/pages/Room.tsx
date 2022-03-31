import { FormEvent } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import "../styles/room.scss";

type RoomParams = {
    id:string
}


export function Room(){

    const user = useAuth()
    const params = useParams<RoomParams>()

    const [newQuestion,setNewQuestion] = useState("");
    const roomId = params.id;

    const handleSendQuestion = (e:FormEvent) =>{}
    return(
       <div id="page-room">
           <header className="header-room-page">
                <div style={{
                    width: "80%",
                }}>
                    <img src={logo} alt="logo" style={{height:50}}/>
                </div>
                <RoomCode id={roomId}></RoomCode>

           </header>

           <main className="main-content-room-page">
                <h1 className="title-room">Sala react</h1>

                <span style={{
                    padding: "15px",
                    backgroundColor:"rgba(229, 89, 249, 1)",
                    borderRadius:"999px",
                    color:"#fff"
                }}>4 perguntas</span>

                <form className="form-questions-room-page" onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="oque voce quer perguntar?"
                        className="text-form-page"
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    /> 

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça o login</button>.</span>
                        <Button type="submit" className="button-room-question">
                            Enviar pergunta
                        </Button>
                    </div>

                    
                </form>

           </main>

       </div>
    )
}