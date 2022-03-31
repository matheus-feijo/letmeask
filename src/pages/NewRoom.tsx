import {Link, useHistory} from "react-router-dom";

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg";
import "../styles/home.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { getDatabase,push, ref, set} from "firebase/database";


export function NewRoom(){

    const {user} = useAuth();
    const history = useHistory();
    const[newRoom,setNewRoom] = useState("");

    async function handleCreateRoom(e: FormEvent){
        e.preventDefault();
        console.log(newRoom);

        if(newRoom.trim() === ""){
            return
        }


        const db = getDatabase();
        const roomRef = ref(db,"rooms");

        const firebaseRoom = await push(roomRef);
        set(firebaseRoom,{
            title:newRoom,
            authorId:user?.id
        })

        history.push(`/rooms/${firebaseRoom.key}`);

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
                    <p className="msg-new-room">Crie uma nova sala</p>
                    <div className="div-risco">ou entre em uma sala</div>
                    <form onSubmit={handleCreateRoom}> 
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={e => setNewRoom(e.target.value)}
                        />
                        <Button 
                            name="button-entrar"
                            type="submit"
                        >
                            Entrar na sala
                        </Button>
                    </form>
                    <p className="msg-sala-existente">Quer entrar em uma sala ja existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}