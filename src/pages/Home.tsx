import {useHistory} from "react-router-dom";

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import "../styles/home.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { get, getDatabase, ref } from "firebase/database";


export function Home(){
    const history = useHistory();
    const { user,signIn} = useAuth();
    const [roomCode,setRoomCode] = useState('');


    const handleCreateRoom = async() =>{
        //
        if(!user){
            await signIn();
        }

        history.push("/rooms/new");
    }


    const handleJoinRoom = async(e:FormEvent)=>{
        e.preventDefault();

        if(roomCode.trim() ===  ""){
            return;
        }

        const db = getDatabase();
        const roomRef =ref(db,`/rooms/${roomCode}`);
        const room = get(roomRef);

        if(!(await room).exists()){
            alert("SALA NAO EXISTE");
            return;
        }

        
        if((await room).val().endedAt){
            alert("sala ja esta fechada");
            return
        }

        history.push(`/rooms/${roomCode}`);

    }

    
    return(
        <div id="initial-pages">
            <aside className="background">

                <img src={illustration} alt="imagem de fundo"></img>
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>

            </aside>

            <main className="room-content">
                <div className="form-enter">
                    <img src={logo} alt="logo" className="logo"></img>
                    <Button name="button-google-icon" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="iconGoogle" className="img-icon-google"></img>
                        Crie sua sala com o google
                    </Button>
                    <div className="div-risco">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}> 
                        <input 
                            type="text"
                            placeholder="digite seu codigo"
                            onChange={e=>setRoomCode(e.target.value)}
                        />
                        <Button 
                            name="button-entrar"
                            type="submit"
                        >
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}