// import { getDatabase, push, ref } from "firebase/database";
// import { FormEvent } from "react";
// import { useState } from "react";

import { getDatabase, push, ref, remove, update } from "firebase/database";
import { useHistory, useParams } from "react-router-dom";

import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";

import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
// import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import "../styles/room.scss";

import deleteImg from "../assets/images/delete.svg"
import logo from "../assets/images/logo.svg";

type RoomParams = {
    id:string
}




export function AdminRoom(){
    
    // const {user} = useAuth()
    const params = useParams<RoomParams>(); 
    const history = useHistory();
    const roomId = params.id;
    const {question,title} = useRoom(roomId);
    const {user} = useAuth();

    const handleLikedQuestion = async(questionId:string,hasLiked:boolean) =>{
        if(hasLiked){

        }else{
            const db = getDatabase();
            const newLike = await ref(db,`rooms/${roomId}/questions/${questionId}/likes`);
            push(newLike,{
                authorId:user?.id
            })
        }
    }


    const handleEndRoom = async() =>{
        const db = getDatabase();
        const roomEndRef = ref(db,`rooms/${roomId}`);
        update(roomEndRef,{
            endedAt:new Date(),
        })

        history.push("/")
    }

    const handleDeleteQuestion = async(questionId:string) =>{

        if(window.confirm("Tem certeza que deseja excluir essa pergunta?")){
            const db = getDatabase();
            const questionRef = ref(db,`rooms/${roomId}/questions/${questionId}`);
            await remove(questionRef);
        }
    }

    const handleCheckAsAnswered = async(questionId:string) =>{
        const db = getDatabase();
        const questionRef = ref(db,`rooms/${roomId}/questions/${questionId}`);
        await update(questionRef,{
            isAnswered:true,
        });
    }

    const handleHighlightedQuestion = async(questionId:string) =>{
        const db = getDatabase();
        const questionRef = ref(db,`rooms/${roomId}/questions/${questionId}`);
        await update(questionRef,{
                isHighLighted:true,
        });
    }

    return(
       <div id="page-room">
           <header className="header-room-page">
                <div style={{
                    width: "80%",
                }}>
                    <img src={logo} alt="logo" style={{height:50}}/>
                </div>
                <RoomCode id={roomId}></RoomCode>
                <Button className="button-close-room" onClick={handleEndRoom}>Encerrar sala</Button>

           </header>

           <main className="main-content-room-page">
                <h1 className="title-room">Sala {title}</h1>

                {question.length > 0 && 
                <span style={{
                    padding: "15px",
                    backgroundColor:"rgba(229, 89, 249, 1)",
                    borderRadius:"999px",
                    color:"#fff"
                }}>{question.length === 1 ? (`${question.length} pergunta`):(`${question.length} perguntas`)}</span>}

                
                <div className="question-list-admin">
                    
                {question.map(quest =>{
                    return(
                        <Question
                            key={quest.id}
                            content={quest.content}
                            author={quest.author}
                            isAnswered={quest.isAnswered}
                            isHighLighted={quest.isHighlighted}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={e => handleCheckAsAnswered(quest.id)}
                                >
                                    <img src={checkImg} alt="Marcar uma pergunta como respondida"></img>
                                </button>

                                <button
                                    type="button"
                                    onClick={e => handleHighlightedQuestion(quest.id)}
                                >
                                    <img src={answerImg} alt="dar destaque a uma pergunta"></img>
                                </button>

                                <button
                                    type="button"
                                    onClick={e => handleDeleteQuestion(quest.id)}
                                >
                                    <img src={deleteImg} alt="remover pergunta"></img>
                                </button>
                            </div>
                        </Question>  
                    )
                })}
                </div>

           </main>

       </div>
    )
}