import {  getDatabase, push, ref, remove } from "firebase/database";
import { FormEvent } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import "../styles/room.scss";

type RoomParams = {
    id:string
}




export function Room(){
    
    const {user} = useAuth()
    const params = useParams<RoomParams>(); 
    const [newQuestion,setNewQuestion] = useState("");
    const roomId = params.id;
    const {question,title} = useRoom(roomId);

    

    const handleSendQuestion = async(e:FormEvent) =>{
        e.preventDefault();
        if(newQuestion.trim() === ""){
            return;
        }

        if(!user){
            throw new Error("USUARIO NAO EXISTE")
        }

        const questions = {
            content:newQuestion,
            author:{
                name:user.name,
                avatar:user.avatar

            },
            isHighLighted:false,
            isAnswered:false
        }

        const db = getDatabase();
        const refRoom = await ref(db,`rooms/${roomId}/questions`);
        await push(refRoom,questions)
        

    }

    const handleLikeQuestion = async(questionId:string,likeId:string | undefined) =>{
        const db = getDatabase();

        if(likeId){
            const newLike = ref(db,`rooms/${roomId}/questions/${questionId}/likes/${likeId}`);
            await remove(newLike);
        }else{
            const newLike = ref(db,`rooms/${roomId}/questions/${questionId}/likes`);
            await push(newLike,{
                authorId:user?.id
            })
        }
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

                <form className="form-questions-room-page" onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="oque voce quer perguntar?"
                        className="text-form-page"
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    /> 

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ): (
                            <span>Para enviar uma pergunta, <button>fa??a o login</button>.</span>
                        )}
                        <Button type="submit" className="button-room-question" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                <div className="question-list">
                    
                {question.map(quest =>{
                    return(
                        <Question
                            key={quest.id}
                            content={quest.content}
                            author={quest.author}
                            isAnswered={quest.isAnswered}
                            isHighLighted={quest.isHighlighted}
                        >
                            <button
                                className={`like-button ${quest.likeId ? 'liked': ''}`}
                                type="button"
                                aria-label="Marcar como gostei"
                                onClick={e =>{
                                    e.preventDefault();
                                    handleLikeQuestion(quest.id,quest.likeId);
                                }}
                            >
                                {quest.likesCount > 0 && <span>{quest.likesCount}</span>}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                            </button>

                        </Question>
                    )
                })}
                </div>

           </main>

       </div>
    )
}