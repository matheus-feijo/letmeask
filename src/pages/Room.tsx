import { child, get, getDatabase, onValue, push, ref } from "firebase/database";
import { useEffect } from "react";
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

type FirebaseQuestions = Record<string,{
    author:{
        name:string,
        avatar:string
    },
    content:string,
    isAnswered:boolean,
    isHighlighted:boolean,
}>

type QuestionProps = {
    id:string,
    author:{
        name:string,
        avatar:string
    },
    content:string,
    isAnswered?:boolean,
    isHighlighted?:boolean,
}

export function Room(){

    const {user} = useAuth()
    const params = useParams<RoomParams>()

    const [newQuestion,setNewQuestion] = useState("");
    const [question,setQuestion] = useState<QuestionProps[]>([]);
    const [title,setTitle] = useState("");


    const roomId = params.id;

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

    /**USE EFFECT */
    useEffect(()=>{
        const db = getDatabase();
        //const roomRef = ref(db);
        onValue(ref(db,`rooms/${roomId}`),(snapshot=>{
            if(snapshot.exists()){
                const aux = snapshot.val();

                const firebaseQuestions :FirebaseQuestions = aux.questions ?? {};


                const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value])=>{
                    return{
                        id:key,
                        author:value.author,
                        content:value.content,
                        isHighLighted:value.isHighlighted,
                        isAnswered:value.isAnswered
                    }
                })
                
                setTitle(aux.title);
                setQuestion(parsedQuestions);
                console.log(parsedQuestions);
            }
        }))
    },[roomId])

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
                            <span>Para enviar uma pergunta, <button>faça o login</button>.</span>
                        )}
                        <Button type="submit" className="button-room-question" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                {JSON.stringify(question)}

           </main>

       </div>
    )
}