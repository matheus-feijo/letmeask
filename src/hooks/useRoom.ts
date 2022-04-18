import { useState,useEffect } from "react";
import { child, get, getDatabase, off, onValue, push, ref } from "firebase/database";
import { useAuth } from "./useAuth";

type QuestionProps = {
    id:string,
    author:{
        name:string,
        avatar:string
    },
    content:string,
    isAnswered?:boolean,
    isHighlighted?:boolean,
    likesCount:number,
    likeId:string | undefined,
}

type FirebaseQuestions = Record<string,{
    author:{
        name:string,
        avatar:string
    },
    content:string,
    isAnswered:boolean,
    isHighlighted:boolean,
    likes:Record<string,{
        authorId:string,
    }>
}>

export function useRoom(roomId:string){
    const {user} = useAuth();
    const [question,setQuestion] = useState<QuestionProps[]>([]);
    const [title,setTitle] = useState("");

    /**USE EFFECT */
    useEffect(()=>{
        const db = getDatabase();
        const roomRef = ref(db,`rooms/${roomId}`);
        onValue(roomRef,(snapshot=>{
            if(snapshot.exists()){
                const aux = snapshot.val();

                const firebaseQuestions :FirebaseQuestions = aux.questions ?? {};


                const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value])=>{
                    return{
                        id:key,
                        author:value.author,
                        content:value.content,
                        isHighLighted:value.isHighlighted,
                        isAnswered:value.isAnswered,
                        likesCount:Object.values(value.likes ?? {}).length,
                        likeId:Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0]
                    }
                })
                
                setTitle(aux.title);
                setQuestion(parsedQuestions);
                //console.log(parsedQuestions);
            }
        }))

        return ()=>{
            off(roomRef);
        }
    },[roomId,user?.id])

    return {question,title}
}